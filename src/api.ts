import { Employee } from "./types";

export function fetchEmployees(): Promise<Employee[]> {
  return fetch('/api/employees').then(res => res.json());
}

export function updateManager(employeeId: number, newManagerId: number): Promise<Employee[]> {
  return fetch(
    '/api/employee',
    { method: 'POST', body: JSON.stringify({ employeeId, newManagerId }) }
  ).then(res => res.json());
}
