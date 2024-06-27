import datetime
import io
import os
from builtins import reversed
from functools import cache
from typing import Optional

import flask
import pygame

from backend.map_generation import generate_map
from backend.models import Location, Category, Product, db

tiles_bp = flask.Blueprint('tiles', __name__)


def get_tile_path(filename):
    working_dir = os.path.dirname(__file__)
    return os.path.join(working_dir, '..', 'assets', 'tiles', filename)


def get_tile_path_by_id(tile_id: str):
    tile_path = get_tile_path(f'tile_{tile_id}.png')
    if os.path.exists(tile_path):
        return tile_path
    return get_tile_path('blank_tile.png')


def hsl_to_rgb(hue: float, saturation: float, lightness: float) -> tuple[int, int, int]:
    c = (1 - abs(2 * lightness - 1)) * saturation
    x = c * (1 - abs((hue / 60) % 2 - 1))
    m = lightness - c / 2

    if 0 <= hue < 60:
        r, g, b = c, x, 0
    elif 60 <= hue < 120:
        r, g, b = x, c, 0
    elif 120 <= hue < 180:
        r, g, b = 0, c, x
    elif 180 <= hue < 240:
        r, g, b = 0, x, c
    elif 240 <= hue < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x

    return int((r + m) * 255), int((g + m) * 255), int((b + m) * 255)


@cache
def load_tile(tile_id: str) -> pygame.Surface:
    return pygame.image.load(get_tile_path_by_id(tile_id))


TILE_SIZE = 128


def get_map_dimensions(store_map) -> tuple[int, int]:
    return len(store_map[0]), len(store_map)


def get_tile_at(store_map, x: int, y: int) -> Optional[str]:
    width, height = get_map_dimensions(store_map)
    if 0 <= x < width and 0 <= y < height:
        # If the coordinates are on the edge, lie that there is a wall
        if x == 0 or y == 0 or x == width - 1 or y == height - 1:
            return 'W'
        value = store_map[height - y - 1][x]
        return value if value != '.' else None
    return None


def get_hue_for_category_name(name: str) -> int:
    return sum(ord(char) for char in name) % 360


@cache
def _render_map(store_map) -> bytes:
    products = db.session.query(Product).join(Category, Product.category_id == Category.id).all()
    location_id_to_product = {product.product_id: product for product in products}
    locations = db.session.query(Location).all()

    coords_to_category = {}
    for location in locations:
        if not location.location_id.startswith('P'):
            continue
        coords_to_category[(location.y, location.x)] = location_id_to_product[location.location_id].category.name

    width, height = get_map_dimensions(store_map)
    surface = pygame.Surface((width * TILE_SIZE, height * TILE_SIZE))

    # Fill with #d8d8d8
    surface.fill((216, 216, 216))

    for y, row in enumerate(reversed(store_map)):
        for x, tile in enumerate(row):
            if get_tile_at(store_map, x, y):
                # We need to draw connections
                connection_thickness = 15
                con_left_rect = pygame.Rect(
                    x * TILE_SIZE, y * TILE_SIZE + TILE_SIZE // 2 - connection_thickness // 2,
                    TILE_SIZE // 2, connection_thickness
                )
                con_right_rect = pygame.Rect(
                    x * TILE_SIZE + TILE_SIZE // 2, y * TILE_SIZE + TILE_SIZE // 2 - connection_thickness // 2,
                    TILE_SIZE // 2, connection_thickness
                )
                con_top_rect = pygame.Rect(
                    x * TILE_SIZE + TILE_SIZE // 2 - connection_thickness // 2, y * TILE_SIZE,
                    connection_thickness, TILE_SIZE // 2
                )
                con_bottom_rect = pygame.Rect(
                    x * TILE_SIZE + TILE_SIZE // 2 - connection_thickness // 2, y * TILE_SIZE + TILE_SIZE // 2,
                    connection_thickness, TILE_SIZE // 2
                )

                # Draw connecting lines
                color = (0, 0, 0) if tile != 'X' else (110, 0, 0)
                has_connections = False
                if get_tile_at(store_map, x, y - 1):
                    pygame.draw.rect(surface, color, con_top_rect)
                    has_connections = True
                if get_tile_at(store_map, x, y + 1):
                    pygame.draw.rect(surface, color, con_bottom_rect)
                    has_connections = True
                if get_tile_at(store_map, x - 1, y):
                    pygame.draw.rect(surface, color, con_left_rect)
                    has_connections = True
                if get_tile_at(store_map, x + 1, y):
                    pygame.draw.rect(surface, color, con_right_rect)
                    has_connections = True
                if has_connections:
                    # Make corners round
                    # The circle gives that illusion
                    pygame.draw.circle(surface, color, (x * TILE_SIZE + TILE_SIZE // 2, y * TILE_SIZE + TILE_SIZE // 2),
                                       connection_thickness // 2)

            # Draw squares for products
            if tile == 'P':
                hue = get_hue_for_category_name(coords_to_category.get((y, x), 'Unknown'))
                hsl = (hue, 0.3, 0.5)
                color = hsl_to_rgb(*hsl)
                rect_size = 70
                rect = pygame.Rect(
                    x * TILE_SIZE + TILE_SIZE // 2 - rect_size // 2,
                    y * TILE_SIZE + TILE_SIZE // 2 - rect_size // 2,
                    rect_size, rect_size
                )
                pygame.draw.rect(surface, color, rect)

            surface.blit(load_tile(tile), (x * TILE_SIZE, y * TILE_SIZE))

    buffer = io.BytesIO()
    pygame.image.save(surface, buffer, 'map.png')
    buffer.seek(0)
    return buffer.getvalue()


def render_map(store_map) -> io.BytesIO:
    frozen_map = tuple(tuple(row) for row in store_map)
    buffer = _render_map(frozen_map)
    return io.BytesIO(buffer)


@tiles_bp.get('/api/map')
def get_map():
    store_map = generate_map()
    if 'image' in flask.request.headers.get('Accept', '').lower():
        buffer = render_map(store_map)
        response = flask.send_file(buffer, mimetype='image/png')
        response.cache_control.max_age = 60  # Cache the response for 60 seconds
        response.cache_control.stale_while_revalidate = 300  # Allow stale content for 5 minutes while revalidating
        response.last_modified = datetime.datetime.utcnow()
        return response
    else:
        width, height = get_map_dimensions(store_map)

        # Discover the start and end positions
        start = None
        end = None

        for y, row in enumerate(reversed(store_map)):
            for x, tile in enumerate(row):
                if tile == 'E':
                    start = (x, y)
                elif tile == 'F':
                    end = (x, y)

        return {
            'map': store_map,
            'dimensions': {
                'width': width,
                'height': height
            },
            'leaflet_data': {
                'bounds': [[-0.5, -0.5], [height - 1 + 0.5, width - 1 + 0.5]],
                'start_position': [start[1], start[0]],
                'end_position': [end[1], end[0]]
            }
        }
