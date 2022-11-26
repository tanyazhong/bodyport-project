from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy(app)


class AsDict:
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(db.Model, AsDict):
    __tablename__ = 'users'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)


class Measurement(db.Model, AsDict):
    __tablename__ = 'measurements'
    id = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    creation_date = db.Column(db.DateTime(timezone=True))
    weight_kg = db.Column(db.Float)
    heart_rate = db.Column(db.Integer)
    peak_count = db.Column(db.Integer)
    body_fat_percent = db.Column(db.Float)
    backend_sway_area_mm2 = db.Column(db.Integer)


@app.route('/measurements', methods=['GET'])
def get_measurements():
    print(db)

    measurements = db.session.query(Measurement).all()
    return jsonify([m.as_dict() for m in measurements])
