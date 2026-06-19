from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import check_connection, engine
from app.routers.employee_router import router as employee_router

app = FastAPI(title="Employee API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:3000",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)


@app.get("/")
def home():
    if not check_connection():
        return {
            "status": "FAILED",
            "message": "Database Connection Failed",
        }

    with engine.connect() as conn:
        current_time = conn.execute(text("SELECT NOW()")).scalar()

    return {
        "status": "SUCCESS",
        "message": "Database Connected",
        "server_time": str(current_time),
    }
