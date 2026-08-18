from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.testimoni import Testimoni as TestimoniModel
from app.schemas.testimoni import Testimoni as TestimoniSchema, TestimoniCreate

router = APIRouter(
    prefix="/api/testimoni",
    tags=["Testimoni"],
)


@router.get("/", response_model=List[TestimoniSchema])
def get_testimoni(db: Session = Depends(get_db)):
    return db.query(TestimoniModel).order_by(TestimoniModel.id.desc()).all()


@router.post("/", response_model=TestimoniSchema)
def create_testimoni(testimoni: TestimoniCreate, db: Session = Depends(get_db)):
    new_testimoni = TestimoniModel(**testimoni.dict())
    db.add(new_testimoni)
    db.commit()
    db.refresh(new_testimoni)
    return new_testimoni