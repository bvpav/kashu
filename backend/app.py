from flask import Flask
from .models import db
from .routes.products import products_bp
from .routes.categories import categories_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'  # SQLite URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(products_bp)
app.register_blueprint(categories_bp)

if __name__ == '__main__':
    app.run(debug=True)
