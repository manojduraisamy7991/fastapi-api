"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const EMPLOYEES_API = "http://127.0.0.1:8000/employees/";

export default function EmployeeForm() {
  const router = useRouter();
  const [name, setName] = useState("Manoj");
  const [role, setRole] = useState("Python Developer");
  const [salary, setSalary] = useState("80000");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const salaryValue = Number(salary);

    if (!name.trim() || !role.trim() || !Number.isFinite(salaryValue)) {
      setError("Enter a name, role, and valid salary.");
      return;
    }

    try {
      const response = await fetch(EMPLOYEES_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          salary: salaryValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      setMessage("Employee saved.");
      startTransition(() => {
        router.refresh();
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save employee.",
      );
    }
  }

  return (
    <section className={styles.formPanel} aria-label="Add employee">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Name
          <input
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label>
          Role
          <input
            name="role"
            type="text"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          />
        </label>
        <label>
          Salary
          <input
            name="salary"
            type="number"
            min="0"
            step="1"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Add Employee"}
        </button>
      </form>
      {(message || error) && (
        <p className={error ? styles.formError : styles.formMessage}>
          {error ?? message}
        </p>
      )}
    </section>
  );
}
