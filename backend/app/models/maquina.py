from .. import db
from .tipo_maquina import Tipo_maquina
from datetime import datetime
from sqlalchemy import event

class Maquina(db.Model):
    __tablename__ = 'maquinas'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    tipo_maquina_id = db.Column(db.Integer, db.ForeignKey('tipo_maquinas.id'), nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    ultima_alteracao = db.Column(db.DateTime, nullable=False, default=datetime.now)
    tipo_maquina = db.relationship('Tipo_maquina', back_populates='maquinas', lazy=True)

def alteracao(mapper, connection, target):
    if db.inspect(target).attrs.status.history.has_changes():
        target.ultima_alteracao = datetime.now()

event.listen(Maquina, 'before_update', alteracao)