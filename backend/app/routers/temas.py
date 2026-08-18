from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.tema import Tema as TemaModel
from app.schemas.tema import Tema as TemaSchema

router = APIRouter(
    prefix="/api/temas",
    tags=["Temas"],
)

@router.get("/", response_model=List[TemaSchema])
def get_temas(db: Session = Depends(get_db)):
    temas = db.query(TemaModel).all()
    return temas