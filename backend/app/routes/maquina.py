from ..models import Maquina, Tipo_maquina
from flask import request, jsonify
from .. import db

def get_maquinas():
    maquinas = Maquina.query.all()
    result = []
    for maquina in maquinas:
        result.append({
            "id": maquina.id,
            "nome": maquina.nome,
            "tipo_maquina_id": maquina.tipo_maquina_id,
            "tipo": maquina.tipo_maquina.descricao,
            "status": maquina.status,
            "ultima_alteracao": maquina.ultima_alteracao
        })
    return jsonify(result)

def get_maquina(id):
    maquina = Maquina.query.get_or_404(id)
    return jsonify({
        "id": maquina.id,
        "nome": maquina.nome,
        "tipo_maquina_id": maquina.tipo_maquina_id,
        "tipo": maquina.tipo_maquina.descricao,
        "status": maquina.status,
        "ultima_alteracao": maquina.ultima_alteracao
    })

def post_maquina():
    data = request.get_json()
    maquina = Maquina(nome=data['nome'], tipo_maquina_id=data['tipo_maquina_id'], status=data['status'])
    db.session.add(maquina)
    db.session.commit()
    return jsonify({
        "id": maquina.id,
        "nome": maquina.nome,
        "tipo_maquina_id": maquina.tipo_maquina_id,
        "tipo": maquina.tipo_maquina.descricao,
        "status": maquina.status,
        "ultima_alteracao": maquina.ultima_alteracao
    })

def put_maquina(id):
    maquina = Maquina.query.get_or_404(id)
    data = request.get_json()
    maquina.nome = data['nome']
    maquina.tipo_maquina_id = data['tipo_maquina_id']
    maquina.status = data['status']
    db.session.commit()
    return jsonify({
        "id": maquina.id,
        "nome": maquina.nome,
        "tipo_maquina_id": maquina.tipo_maquina_id,
        "tipo": maquina.tipo_maquina.descricao,
        "status": maquina.status,
        "ultima_alteracao": maquina.ultima_alteracao
    })

def delete_maquina(id):
    maquina = Maquina.query.get_or_404(id)
    db.session.delete(maquina)
    db.session.commit()
    return jsonify({})