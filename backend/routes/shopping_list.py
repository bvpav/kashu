from flask import Blueprint, request, jsonify
from backend.models import db, ShoppingList, Product

shopping_list_bp = Blueprint('shopping_list', __name__)


@shopping_list_bp.route('/api/shopping-lists/', methods=['POST'])
def create_shopping_list():
    new_list = ShoppingList()
    db.session.add(new_list)
    db.session.commit()
    return jsonify(new_list.to_dict()), 201


@shopping_list_bp.route('/api/shopping-lists/<int:list_id>', methods=['PUT'])
def add_products_to_shopping_list(list_id):
    shopping_list = ShoppingList.query.get(list_id)
    if shopping_list:
        product_ids = request.json.get('product_ids', [])
        products = Product.query.filter(Product.id.in_(product_ids)).all()
        shopping_list.products.extend(products)
        db.session.commit()
        return jsonify(shopping_list.to_dict())
    else:
        return jsonify({'error': 'Shopping list not found'}), 404
