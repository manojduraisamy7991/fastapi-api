# Employee API

FastAPI backend for the employee MVP.

## Structure

```text
app/
├── venv/
├── main.py
├── database.py
├── routers/
├── services/
├── schemas/
├── models/
├── .env
├── .gitignore
├── README.md
└── requirements.txt
```

## Run

```powershell
cd app
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The UI calls this backend at `http://127.0.0.1:8000`.
