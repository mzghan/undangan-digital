from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import temas, portofolio, testimoni, planner_package, hashtag, wedding_trial, checklist, timeline, checklistPremium, timelinePremium, vendor, guest, seating

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Undangan Digital API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(temas.router)
app.include_router(portofolio.router)
app.include_router(testimoni.router)
app.include_router(planner_package.router)
app.include_router(hashtag.router)
app.include_router(wedding_trial.router)
app.include_router(checklist.router)
app.include_router(timeline.router)
app.include_router(checklistPremium.router)
app.include_router(timelinePremium.router)
app.include_router(vendor.router)
app.include_router(guest.router)
app.include_router(seating.router)

@app.get("/")
def root():
    return {"message": "Undangan Digital API is Running"}