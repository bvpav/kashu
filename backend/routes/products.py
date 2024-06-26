from flask import Blueprint, jsonify, request
from backend.models import Product, Category

products_bp = Blueprint('products', __name__)


@products_bp.route('/api/products/')
def get_products():
    category_name = request.args.get('category')
    if category_name:
        category = Category.query.filter_by(name=category_name).first()
        if category:
            products = Product.query.filter_by(category_id=category.id).all()
        else:
            return jsonify({'error': 'Category not found'}), 404
    else:
        products = Product.query.all()
    return jsonify([product.to_dict() for product in products])


@products_bp.route('/api/products/<int:product_id>')
def get_product(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({'error': 'Product not found'}), 404
