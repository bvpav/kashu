from flask import Blueprint, jsonify
from backend.models import Category
from sqlalchemy.orm import joinedload

categories_bp = Blueprint('categories', __name__)


@categories_bp.route('/api/categories/')
def get_categories():
    categories_data = Category.query.options(
        joinedload(Category.products)).all()
    categories = {
        category.id: {
            "id": category.id,
            "name": category.name,
            "description": category.description,
            "products": [
                {
                    "id": prod.id,
                    "name": prod.name,
                    "product_id": prod.product_id,
                    "category_id": prod.category_id
                } for prod in category.products
            ]
        } for category in categories_data
    }

    return jsonify(list(categories.values()))


@categories_bp.route('/api/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.options(
        joinedload(Category.products)).get(category_id)
    if category:
        return jsonify(category.to_dict())
    else:
        return jsonify({'error': 'Category not found'}), 404
