from flask import Blueprint, request, jsonify
from backend.models import db, Product, Location
from backend.routes.shop_routing import get_path
from backend.map_generation import generate_map, get_exit, get_start
from sqlalchemy import join

shopping_list_bp = Blueprint('shopping_list', __name__)


@shopping_list_bp.route('/api/shopping-list', methods=['POST'])
def get_shopping_list_route():
    golden_eggs_pos = ((4, 27), (11, 32), (10, 23), (11, 22), (20, 25))

    ids = request.json.get('ids', [])
    products = Product.query.filter(Product.id.in_(ids)).all()

    if not products:
        return jsonify({'error': 'No products found'}), 404

    print("PRODUCTS", products)
    for product in products:
        print(product.id)

    locations = db.session.query(Location).join(
        Product, Location.location_id == Product.product_id).filter(Product.id.in_(ids)).all()

    items = [(location.y, location.x) for location in locations]

    print("ITEMS", items)

    map = generate_map()

    start = get_start()
    end = get_exit()

    map[end[0]][end[1]] = '.'
    map[start[0]][start[1]] = '.'

    for i in range(21):
        for j in range(41):
            if (i, j) not in items and map[i][j] != '.':
                map[i][j] = 'X'

    # make all the items as 1
    for item in items:
        map[item[0]][item[1]] = 1

    paths = []

    for golden_egg in golden_eggs_pos:
        items.append(golden_egg)
        map[golden_egg[0]][golden_egg[1]] = 1
        paths.append(get_path(start, end, items, map))
        map[golden_egg[0]][golden_egg[1]] = 'X'
        items.pop()

    shortest_path = min(paths, key=lambda x: len(x))

    print(shortest_path)

    shortest_path = [{'y': path[0], 'x': path[1],
                      'is_collectable': path[2]} for path in shortest_path]

    # set golden eggs as not collectable
    for golden_egg in golden_eggs_pos:
        for path in shortest_path:
            if path['y'] == golden_egg[0] and path['x'] == golden_egg[1]:
                path['is_collectable'] = False

    return jsonify(shortest_path)
