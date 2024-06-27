import time
from flask import Blueprint, request, jsonify
from backend.models import db, Product, Location
from backend.routes.shop_routing import get_path
from backend.map_generation import generate_map, get_exit, get_start, get_checkouts
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

    # make all the items as 1
    for item in items:
        map[item[0]][item[1]] = '1'

    paths = []

    checkouts = get_checkouts()

    # check if golden eggs are in items
    golden_eggs = False
    for item in items:
        if item in golden_eggs_pos:
            golden_eggs = True
            break

    if not golden_eggs:
        for checkout in checkouts:
            # items.append(checkout)
            current_end = checkout
            map[checkout[0]][checkout[1]] = '1'
            print("CURRENT_END", current_end)

            for golden_egg in golden_eggs_pos:
                items.append(golden_egg)
                map[golden_egg[0]][golden_egg[1]] = '1'
                print("ITEMS", items)
                paths.append(get_path(start, current_end, items, map))
                map[golden_egg[0]][golden_egg[1]] = 'X'
                items.pop()

            map[checkout[0]][checkout[1]] = 'X'
            # items.pop()
    else:
        for checkout in checkouts:
            # items.append(checkout)
            current_end = checkout
            map[checkout[0]][checkout[1]] = '1'
            print("CURRENT_END", current_end)

            paths.append(get_path(start, current_end, items, map))
            map[checkout[0]][checkout[1]] = 'X'

    shortest_path = min(paths, key=lambda x: len(x))

    map[end[0]][end[1]] = '1'
    shortest_path[-1] = (shortest_path[-1][0], shortest_path[-1][1], True)

    shortest_path.extend(get_path(shortest_path[-1], end, [end], map)[1:])

    print(shortest_path)

    shortest_path = [{'y': path[0], 'x': path[1],
                      'is_collectable': path[2]} for path in shortest_path]

    # set golden eggs as not collectable
    # for golden_egg in golden_eggs_pos:
    #     for path in shortest_path:
    #         if path['y'] == golden_egg[0] and path['x'] == golden_egg[1]:
    #             path['is_collectable'] = False

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Execution Time: {execution_time} seconds")

    return jsonify(shortest_path)
