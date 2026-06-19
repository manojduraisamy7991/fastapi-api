from os import getenv
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv(Path(__file__).resolve().parent / ".env")

DATABASE_URL = getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured. Add it to your .env file.")

engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": "require"},
)


def check_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as error:
        print("DB Error:", error)
        return False
