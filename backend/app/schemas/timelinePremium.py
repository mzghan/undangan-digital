from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from app.schemas.checklistPremium import ChecklistItemPremiumSchema


class TimelinePremiumSetRequest(BaseModel):
    session_id: str
    wedding_date: str  # format ISO: "2027-06-20"


class TimelinePremiumResponse(BaseModel):
    session_id: str
    wedding_date: Optional[datetime]
    items: List[ChecklistItemPremiumSchema]