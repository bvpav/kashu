import io
import os
from functools import cache
from typing import Callable

import flask
import pygame

from backend.map_generation import generate_map

tiles_bp = flask.Blueprint('tiles', __name__)


def get_tile_url(filename):
    working_dir = os.path.dirname(__file__)
    return os.path.join(working_dir, '..', 'assets', 'tiles', filename)


tile_texture = pygame.image.load(get_tile_url('blank_tile.png'))

TILE_SIZE = 128


def render_map() -> io.BytesIO:
    map = generate_map()

    width = len(map[0])
    height = len(map)
    surface = pygame.Surface((width * TILE_SIZE, height * TILE_SIZE))

    for y, row in enumerate(map):
        for x, tile in enumerate(row):
            surface.blit(tile_texture, (x * TILE_SIZE, y * TILE_SIZE))

    buffer = io.BytesIO()
    pygame.image.save(surface, buffer, 'map.png')
    buffer.seek(0)
    return buffer


@tiles_bp.get('/api/map')
def get_tile():
    buffer = render_map()
    return flask.send_file(buffer, mimetype='image/png')
