from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class Category(db.Model):
    __tablename__ = 'Category'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False, unique=True)
    products = relationship('Product', backref='category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Product(db.Model):
    __tablename__ = 'Product'
    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(255), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    category_id = Column(Integer, ForeignKey('Category.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'name': self.name,
            'category_id': self.category_id
        }


class Location(db.Model):
    __tablename__ = 'Location'
    id = Column(Integer, primary_key=True, autoincrement=True)
    x = Column(Integer, nullable=False)
    y = Column(Integer, nullable=False)
    location_id = Column(String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'x': self.x,
            'y': self.y,
            'location_id': self.location_id
        }
