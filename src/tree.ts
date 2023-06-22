import { Employee, RecursiveType } from "./types";

export function mapTreeFromEmployeeList(employees: Employee[], team: string | null): RecursiveType<Employee> {
  const mappedEmployees = topLevelMapping(employees)
  if (!team) {
    return mappedEmployees;
  }
  return topLevelMapping(
    filterEmployeeByTeam(
      JSON.parse(JSON.stringify(employees)),
      team,
      mappedEmployees
    )
  );
}

function topLevelMapping(employees: Employee[]): RecursiveType<Employee> {
  const topLevel = employees.find(employee => !employee.manager);
  return recursiveMapping(employees, topLevel as Employee);
}

function filterEmployeeByTeam(
  employees: Employee[],
  team: string,
  currEmployee: RecursiveType<Employee>,
  prevEmployee?: RecursiveType<Employee>
): Employee[] {
  if (currEmployee.team !== team && prevEmployee) {
    const matchIndex = employees.findIndex(emp => emp.id === currEmployee.id);
    if (matchIndex !== -1) {
      currEmployee.reporters.map(rep => {
        const innerMatchIndex = employees.findIndex(emp => emp.id === rep.id);
        if (innerMatchIndex !== -1)
          employees[innerMatchIndex].manager = prevEmployee.manager || prevEmployee.id;
        rep.manager = prevEmployee.manager || prevEmployee.id;
        return rep;
      })
      employees.splice(matchIndex, 1);
    }
  }
  currEmployee.reporters.forEach(rep => filterEmployeeByTeam(employees, team, rep, currEmployee))
  return employees;
}

function recursiveMapping(employees: Employee[], currentManager: Employee): RecursiveType<Employee> {
  let hasDeeperChildren = false;
  const reporters = employees
    .filter(employee => employee.manager === currentManager.id)
    .map(employee => {
      const child = recursiveMapping(employees, employee);
      if (child.reporters.length) hasDeeperChildren = true;
      return child;
    });
  return {
    ...currentManager,
    reporters,
    hasDeeperChildren
  }
}

export function isValidDropTarget(draggedEmployee: RecursiveType<Employee>, targetEmployee: Employee): boolean {
  if (
    draggedEmployee.id === targetEmployee.id
    || draggedEmployee?.id === targetEmployee.manager
    || draggedEmployee?.manager === targetEmployee.id
  ) {
    return false;
  }
  return !draggedEmployee.reporters.some(rep => !isValidDropTarget(rep, targetEmployee))
}
