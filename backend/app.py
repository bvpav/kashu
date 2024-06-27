from flask import Flask

from .routes.tiles import tiles_bp
from .models import db

from .routes.products import products_bp
from .routes.categories import categories_bp
from .routes.shopping_list import shopping_list_bp

app = Flask(__name__, static_folder='assets')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:QYdebFzgdyiyRAhHCchrbTYHrNplVxlp@viaduct.proxy.rlwy.net:36970/railway'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

map = None

with app.app_context():
    db.create_all()


app.register_blueprint(products_bp)
app.register_blueprint(categories_bp)
app.register_blueprint(shopping_list_bp)
app.register_blueprint(tiles_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
