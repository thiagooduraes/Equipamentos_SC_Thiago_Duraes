from ..models import Maquina, Tipo_maquina
from flask import request, jsonify
from .. import db

def get_tipo_maquinas():
    tipo_maquinas = Tipo_maquina.query.all()
    result = []
    for tipo_maquina in tipo_maquinas:
        result.append({
            "id": tipo_maquina.id,
            "descricao": tipo_maquina.descricao
        })
    return jsonify(result)

def get_tipo_maquina(id):
    tipo_maquina = Tipo_maquina.query.get_or_404(id)
    return jsonify({
        "id": tipo_maquina.id,
        "descricao": tipo_maquina.descricao
    })

def post_tipo_maquina():
    data = request.get_json()
    tipo_maquina = Tipo_maquina(descricao=data['descricao'])
    db.session.add(tipo_maquina)
    db.session.commit()
    return jsonify({
        "id": tipo_maquina.id,
        "descricao": tipo_maquina.descricao
    })

def put_tipo_maquina(id):
    tipo_maquina = Tipo_maquina.query.get_or_404(id)
    data = request.get_json()
    tipo_maquina.descricao = data['descricao']
    db.session.commit()
    return jsonify({
        "id": tipo_maquina.id,
        "descricao": tipo_maquina.descricao
    })

def delete_tipo_maquina(id):
    tipo_maquina = Tipo_maquina.query.get_or_404(id)
    db.session.delete(tipo_maquina)
    db.session.commit()
    return jsonify({})