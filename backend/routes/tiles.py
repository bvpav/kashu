import io
import os
from functools import cache
from typing import Callable

import flask
import pygame

tiles_bp = flask.Blueprint('tiles', __name__)


def get_tile_url(filename):
    working_dir = os.path.dirname(__file__)
    return os.path.join(working_dir, '..', 'assets', 'tiles', filename)


tile_texture = pygame.image.load(get_tile_url('blank_tile.png'))

TILE_SIZE = 128


def render_map(width, height) -> io.BytesIO:
    surface = pygame.Surface((width * TILE_SIZE, height * TILE_SIZE))

    for x in range(width):
        for y in range(height):
            surface.blit(tile_texture, (x * TILE_SIZE, y * TILE_SIZE), (0, 0, TILE_SIZE, TILE_SIZE))

    buffer = io.BytesIO()
    pygame.image.save(surface, buffer, 'map.png')
    buffer.seek(0)
    return buffer


@tiles_bp.get('/api/map')
def get_tile():
    buffer = render_map(2, 2)
    return flask.send_file(buffer, mimetype='image/png')
