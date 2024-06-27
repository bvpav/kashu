import time
from flask import Blueprint, request, jsonify
from backend.models import db, Product, Location
from backend.routes.shop_routing import get_path
from backend.map_generation import generate_map, get_exit, get_start, get_checkouts

shopping_list_bp = Blueprint('shopping_list', __name__)


@shopping_list_bp.route('/api/shopping-list', methods=['POST'])
def get_shopping_list_route():
    golden_eggs_pos = [(4, 27), (11, 32), (10, 23), (11, 22), (20, 25)]

    ids = request.json.get('ids', [])
    products = Product.query.filter(Product.id.in_(ids)).all()
    if not products:
        return jsonify({'error': 'No products found'}), 404

    locations = db.session.query(Location).join(
        Product, Location.location_id == Product.product_id
    ).filter(Product.id.in_(ids)).all()

    items = [(location.y, location.x) for location in locations]
    map = generate_map()
    start_time = time.time()

    start = get_start()
    end = get_exit()
    map[end[0]][end[1]] = '.'
    map[start[0]][start[1]] = '.'

    for i in range(21):
        for j in range(41):
            if (i, j) not in items and map[i][j] != '.':
                map[i][j] = 'X'

    for item in items:
        map[item[0]][item[1]] = '1'

    checkouts = get_checkouts()
    paths = []
    golden_eggs_in_items = any(item in golden_eggs_pos for item in items)

    if not golden_eggs_in_items:
        for checkout in checkouts:
            map[checkout[0]][checkout[1]] = '1'
            for golden_egg in golden_eggs_pos:
                items.append(golden_egg)
                map[golden_egg[0]][golden_egg[1]] = '1'
                paths.append(get_path(start, checkout, items, map))
                map[golden_egg[0]][golden_egg[1]] = 'X'
                items.pop()
            map[checkout[0]][checkout[1]] = 'X'
    else:
        for checkout in checkouts:
            map[checkout[0]][checkout[1]] = '1'
            paths.append(get_path(start, checkout, items, map))
            map[checkout[0]][checkout[1]] = 'X'

    if not paths:
        return jsonify({'error': 'No path found to collect all items'}), 404

    shortest_path = min(paths, key=len)
    map[end[0]][end[1]] = '1'
    shortest_path[-1] = (shortest_path[-1][0], shortest_path[-1][1], True)
    shortest_path.extend(get_path(shortest_path[-1], end, [end], map)[1:])

    cleaned_path = [shortest_path[0]]
    for i in range(1, len(shortest_path)):
        if shortest_path[i] != shortest_path[i - 1]:
            cleaned_path.append(shortest_path[i])

    cleaned_path = [{'y': path[0], 'x': path[1],
                     'is_collectable': path[2]} for path in cleaned_path]

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Execution Time: {execution_time} seconds")

    for path in cleaned_path:
        if path['is_collectable']:
            location_id = db.session.query(Location.location_id).filter(
                Location.x == path['x'], Location.y == path['y']
            ).first()
            if location_id:
                product = Product.query.filter(
                    Product.product_id == location_id[0]).first()
                if product:
                    path['product_name'] = product.name

    return jsonify(cleaned_path)
