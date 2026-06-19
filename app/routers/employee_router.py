from fastapi import APIRouter, status

from app.schemas.employee_schema import EmployeeCreate
from app.services.employee_service import create_employee, get_employees

router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)


@router.get("/")
def list_employees():
    return {"data": get_employees()}


@router.post("/", status_code=status.HTTP_201_CREATED)
def add_employee(employee: EmployeeCreate):
    create_employee(employee)
    return {"message": "Employee Created Successfully"}
