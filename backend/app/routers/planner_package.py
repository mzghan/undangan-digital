from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.planner_package import PlannerPackage as PlannerPackageModel
from app.schemas.planner_package import PlannerPackage as PlannerPackageSchema

router = APIRouter(
    prefix="/api/planner-packages",
    tags=["Planner Packages"],
)


@router.get("/", response_model=List[PlannerPackageSchema])
def get_planner_packages(db: Session = Depends(get_db)):
    return db.query(PlannerPackageModel).all()