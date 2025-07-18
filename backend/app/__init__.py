from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    from .models.maquina import Maquina
    from .models.tipo_maquina import Tipo_maquina

    from .routes.maquina import get_maquinas, get_maquina, post_maquina, put_maquina, delete_maquina
    from .routes.tipo_maquina import get_tipo_maquinas, get_tipo_maquina, post_tipo_maquina, put_tipo_maquina, delete_tipo_maquina

    @app.route('/maquinas', methods=['GET'])
    def maquinas_get_all():
        return get_maquinas()

    @app.route('/maquinas/<int:id>', methods=['GET'])
    def maquina_get_one(id):
        return get_maquina(id)

    @app.route('/maquinas', methods=['POST'])
    def maquina_post():
        return post_maquina()

    @app.route('/maquinas/<int:id>', methods=['PUT'])
    def maquina_put(id):
        return put_maquina(id)

    @app.route('/maquinas/<int:id>', methods=['DELETE'])
    def maquina_delete(id):
        return delete_maquina(id)

    @app.route('/tipo_maquinas', methods=['GET'])
    def tipo_maquinas_get_all():
        return get_tipo_maquinas()

    @app.route('/tipo_maquinas/<int:id>', methods=['GET'])
    def tipo_maquina_get_one(id):
        return get_tipo_maquina(id)

    @app.route('/tipo_maquinas', methods=['POST'])
    def tipo_maquina_post():
        return post_tipo_maquina()

    @app.route('/tipo_maquinas/<int:id>', methods=['PUT'])
    def tipo_maquina_put(id):
        return put_tipo_maquina(id)
    
    @app.route('/tipo_maquinas/<int:id>', methods=['DELETE'])
    def tipo_maquina_delete(id):
        return delete_tipo_maquina(id)

    return app