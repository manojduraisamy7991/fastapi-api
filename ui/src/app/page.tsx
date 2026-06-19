import styles from "./page.module.css";
import EmployeeForm from "./EmployeeForm";

type Employee = Record<string, string | number | boolean | null>;

const EMPLOYEES_API = "http://127.0.0.1:8000/employees/";

async function getEmployees() {
  try {
    const response = await fetch(EMPLOYEES_API, {
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        employees: [],
        error: `API request failed with status ${response.status}`,
      };
    }

    const payload = (await response.json()) as unknown;
    const data =
      payload &&
      typeof payload === "object" &&
      "data" in payload &&
      Array.isArray(payload.data)
        ? payload.data
        : payload;

    if (!Array.isArray(data)) {
      return {
        employees: [],
        error: "API response is not an employee list.",
      };
    }

    return {
      employees: data as Employee[],
      error: null,
    };
  } catch (error) {
    return {
      employees: [],
      error: error instanceof Error ? error.message : "Unable to load employees.",
    };
  }
}

function formatValue(value: Employee[string]) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return String(value);
}

export default async function Home() {
  const { employees, error } = await getEmployees();
  const columns = Array.from(
    employees.reduce((keys, employee) => {
      Object.keys(employee).forEach((key) => keys.add(key));
      return keys;
    }, new Set<string>()),
  );

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <p className={styles.eyebrow}>FastAPI employees</p>
          <h1>Employee List</h1>
        </div>
        <div className={styles.status}>
          <span className={error ? styles.statusError : styles.statusOk} />
          {error ? "Offline" : `${employees.length} records`}
        </div>
      </section>

      <EmployeeForm />

      {error ? (
        <section className={styles.notice}>
          <h2>Could not load employees</h2>
          <p>{error}</p>
          <p>Start your FastAPI server on port 8000, then refresh this page.</p>
        </section>
      ) : employees.length === 0 ? (
        <section className={styles.notice}>
          <h2>No employees found</h2>
          <p>The API is connected, but it returned an empty list.</p>
        </section>
      ) : (
        <section className={styles.tableWrap} aria-label="Employee records">
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column.replaceAll("_", " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={String(employee.id ?? index)}>
                  {columns.map((column) => (
                    <td key={column}>{formatValue(employee[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
