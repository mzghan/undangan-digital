from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.portofolio import Portofolio as PortofolioModel
from app.schemas.portofolio import Portofolio as PortofolioSchema

router = APIRouter(
    prefix="/api/portofolio",
    tags=["Portofolio"],
)


@router.get("/", response_model=List[PortofolioSchema])
def get_portofolio(db: Session = Depends(get_db)):
    items = db.query(PortofolioModel).all()
    return items