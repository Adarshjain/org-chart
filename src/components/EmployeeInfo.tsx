import { Badge, Flex, MantineColor, Text } from "@mantine/core";
import { Employee } from "../types";

function getColor(team: string): string | undefined {
  switch (team) {
    case 'Sales':
      return 'red';
    case 'Engineering':
      return "cyan";
  }
}

export default function EmployeeInfo({ employee }: { employee: Employee }) {
  return <div className="employee-item">
    <img width="32px" src={employee.avatar} alt={employee.name} className="employee-item__avatar" />
    <div>
      <Flex align="center">
        <Text span>{employee.name}</Text>
        {employee.team ? <Badge
          color={getColor(employee.team) as MantineColor}
          size="xs"
          sx={{ marginInlineStart: "4px" }}
        >{employee.team}</Badge> : null}
      </Flex>
      <Text size="sm">{employee.designation}</Text>
    </div>
  </div>
}
