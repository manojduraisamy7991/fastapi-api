from fastapi import FastAPI
from sqlalchemy import create_engine, text

app = FastAPI()

DATABASE_URL = (
    "mssql+pyodbc://@localhost\\SQLEXPRESS/CommerceCloud?"
    "driver=ODBC+Driver+18+for+SQL+Server"
    "&trusted_connection=yes"
    "&TrustServerCertificate=yes"
)

engine = create_engine(DATABASE_URL)

@app.get("/")
def home():
    with engine.connect() as conn:
        db = conn.execute(text("SELECT DB_NAME()")).scalar()

        rows = conn.execute(
            text("SELECT * FROM Products")
        ).mappings().all()

    return {
        "message": "Connected Successfully",
        "database": db,
        "products": rows
    }
