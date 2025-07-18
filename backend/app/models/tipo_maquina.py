from .. import db

class Tipo_maquina(db.Model):
    __tablename__ = 'tipo_maquinas'
    id = db.Column(db.Integer, primary_key=True)
    descricao = db.Column(db.String(255), unique=True, nullable=False)
    maquinas = db.relationship('Maquina', back_populates='tipo_maquina', lazy=True)