from flask import Blueprint, request, jsonify
from backend.models import db, ShoppingList, Product, Location
from backend.routes.shop_routing import get_path
from backend.map_generation import generate_map, get_exit, get_start
from sqlalchemy import join


shopping_list_bp = Blueprint('shopping_list', __name__)


@shopping_list_bp.route('/api/shopping-lists/', methods=['GET'])
def get_all_shopping_lists():
    shopping_lists = ShoppingList.query.all()
    return jsonify([shopping_list.to_dict() for shopping_list in shopping_lists])


@shopping_list_bp.route('/api/shopping-lists/', methods=['POST'])
def create_shopping_list():
    new_list = ShoppingList()
    db.session.add(new_list)
    db.session.commit()
    return jsonify(new_list.to_dict()), 201


@shopping_list_bp.route('/api/shopping-lists/<int:list_id>', methods=['GET', 'POST', 'PUT'])
def handle_shopping_list(list_id):
    if request.method == 'GET':
        shopping_list = ShoppingList.query.get(list_id)
        if shopping_list:
            return jsonify(shopping_list.to_dict())
        else:
            return jsonify({'error': 'Shopping list not found'}), 404
    elif request.method in ['POST', 'PUT']:
        shopping_list = ShoppingList.query.get(list_id)
        if shopping_list:
            product_ids = request.json.get('product_ids', [])
            products = Product.query.filter(Product.id.in_(product_ids)).all()
            shopping_list.products.extend(products)
            db.session.commit()
            return jsonify(shopping_list.to_dict())
        else:
            return jsonify({'error': 'Shopping list not found'}), 404


@shopping_list_bp.route('/api/shopping-lists/<int:list_id>', methods=['DELETE'])
def delete_shopping_list(list_id):
    shopping_list = ShoppingList.query.get(list_id)
    if shopping_list:
        db.session.delete(shopping_list)
        db.session.commit()
        return jsonify({'message': 'Shopping list deleted'})
    else:
        return jsonify({'error': 'Shopping list not found'}), 404


@shopping_list_bp.route('/api/shopping-lists/<int:list_id>/route', methods=['GET'])
def get_shopping_list_route(list_id):
    shopping_list = ShoppingList.query.get(list_id)
    if shopping_list:
        product_ids = [
            product.product_id for product in shopping_list.products]

        j = join(Product, Location, Product.product_id == Location.location_id)

        query = db.session.query(Product, Location).select_from(
            j).filter(Product.product_id.in_(product_ids))

        items = [(location.y, location.x) for product, location in query.all()]

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

        arr = map
        path = [{'y': path[0], 'x': path[1]}
                for path in get_path(start, end, items, arr)]
        return jsonify(path)
    else:
        return jsonify({'error': 'Shopping list not found'}), 404
