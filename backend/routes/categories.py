from flask import Blueprint, jsonify
from backend.models import Category

categories_bp = Blueprint('categories', __name__)


@categories_bp.route('/api/categories/')
def get_categories():
    categories = Category.query.all()
    return jsonify([category.to_dict() for category in categories])


@categories_bp.route('/api/categories/<int:category_id>')
def get_category(category_id):
    category = Category.query.get(category_id)
    if category:
        return jsonify(category.to_dict())
    else:
        return jsonify({'error': 'Category not found'}), 404
