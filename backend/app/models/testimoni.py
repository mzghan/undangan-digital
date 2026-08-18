from sqlalchemy import Column, Integer, String
from app.database import Base


class Testimoni(Base):
    __tablename__ = "testimonis"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    isi = Column(String, nullable=False)
    foto_url = Column(String, nullable=True)