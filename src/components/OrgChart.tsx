import { Employee } from "../types";
import { mapTreeFromEmployeeList } from "../tree.ts";
import { OrgChartBlock } from "./OrgChartBlock.tsx";
import { Alert } from "@mantine/core";

export default function OrgChart({ employees, team }: { employees: Employee[]; team: string | null }) {
  const mappedEmployees = mapTreeFromEmployeeList(employees, team);
  return <div
    className="overflow-auto flex justify-start relative flex-dir-col"
    style={{ width: '100%', paddingBlock: '54px' }}
  >
    <Alert
      icon={<span>&#8505;</span>}
      color="cyan"
      sx={{
        width: 'max-content',
        scale: '0.8',
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10
      }}
    >
      Drag an employee into another to update Manager
    </Alert>
    <OrgChartBlock
      key={mappedEmployees.reporters.length}
      employee={mappedEmployees}
      parentHasDeeperChildren={false}
      parentHasMultipleChildren={mappedEmployees.reporters.length}
    />
  </div>
}
