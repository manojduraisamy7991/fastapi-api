from sqlalchemy import text

from app.database import engine
from app.schemas.employee_schema import EmployeeCreate


def get_employees():
    with engine.connect() as conn:
        return conn.execute(text("SELECT * FROM employees")).mappings().all()


def create_employee(employee: EmployeeCreate):
    with engine.connect() as conn:
        conn.execute(
            text(
                """
                INSERT INTO employees(name, role, salary)
                VALUES(:name, :role, :salary)
                """
            ),
            employee.model_dump(),
        )
        conn.commit()
