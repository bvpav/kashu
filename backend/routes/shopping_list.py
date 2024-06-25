from flask import Blueprint, request, jsonify
from backend.models import db, ShoppingList, Product
from backend.routes.shop_routing import get_path
from backend.map_generation import generate_map

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
        start = (0, 0)
        print(map)
        end = (20, 40)
        # items = [(product.x, product.y) for product in shopping_list.products]
        items = [(2, 3), (4, 4), (4, 7)]
        arr = [[0 for _ in range(10)] for _ in range(10)]
        for item in items:
            arr[item[0]][item[1]] = 1
        path = [{'y': path[0], 'x': path[1]}
                for path in get_path(start, end, items, arr)]
        return jsonify(path)
    else:
        return jsonify({'error': 'Shopping list not found'}), 404