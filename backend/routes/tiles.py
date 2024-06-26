import io
import os
from functools import cache
from typing import Callable

import flask
import pygame

from backend.map_generation import generate_map

tiles_bp = flask.Blueprint('tiles', __name__)


def get_tile_path(filename):
    working_dir = os.path.dirname(__file__)
    return os.path.join(working_dir, '..', 'assets', 'tiles', filename)


def get_tile_path_by_id(tile_id: str):
    tile_path = get_tile_path(f'tile_{tile_id}.png')
    if os.path.exists(tile_path):
        return tile_path
    return get_tile_path('blank_tile.png')


@cache
def load_tile(tile_id: str) -> pygame.Surface:
    return pygame.image.load(get_tile_path_by_id(tile_id))


TILE_SIZE = 128


def render_map() -> io.BytesIO:
    store_map = generate_map()

    width = len(store_map[0])
    height = len(store_map)
    surface = pygame.Surface((width * TILE_SIZE, height * TILE_SIZE))

    for y, row in enumerate(store_map):
        for x, tile in enumerate(row):
            surface.blit(load_tile(tile), (x * TILE_SIZE, y * TILE_SIZE))

    buffer = io.BytesIO()
    pygame.image.save(surface, buffer, 'map.png')
    buffer.seek(0)
    return buffer


@tiles_bp.get('/api/map')
def get_tile():
    buffer = render_map()
    return flask.send_file(buffer, mimetype='image/png')
