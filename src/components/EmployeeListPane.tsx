import { Employee } from "../types";
import { Flex, Select, TextInput, Text, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import EmployeeInfo from "./EmployeeInfo.tsx";

interface EmployeeListPaneProps {
  employees: Employee[];
  onTeamSelect: (team: string | null) => void;
  team: string | null;
  loading: boolean;
}

export function EmployeeListPane({ employees, onTeamSelect, team, loading }: EmployeeListPaneProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredList, setFilteredList] = useState(employees);

  useEffect(() => {
    setFilteredList(
      employees
        .filter(employee => {
          return (
            searchFilter === ''
              || employee.name.toLowerCase().includes(searchFilter.toLowerCase())
              || employee.designation.toLowerCase().includes(searchFilter.toLowerCase())
              || employee.team?.toLowerCase().includes(searchFilter.toLowerCase())
            )
            && (!team || employee.team === team || !employee.team)
        })
    );
  }, [team, searchFilter, employees]);

  return <Flex direction="column" sx={{ minWidth: '260px', borderRight: '1px solid #E6EAF0', overflow: 'auto' }}>
    <div style={{ position: 'sticky', top: 0, background: 'white' }}>
      <Select
        sx={{ marginBlockStart: '16px', marginInline: '12px', zIndex: 10 }}
        data={
          [...new Set(employees.map(employee => employee.team))]
            .filter(Boolean) as string[]
        }
        onChange={onTeamSelect}
        label="Filter by team"
        placeholder="Select"
        clearable
        disabled={loading}
      />
      <TextInput
        sx={{ marginBlockEnd: '16px', marginBlockStart: '4px', marginInline: '12px' }}
        onInput={(event) => setSearchFilter((event.target as HTMLInputElement).value)}
        label="Search"
        placeholder="Search by Name"
        disabled={loading}
      />
    </div>
    {loading ? <Loader sx={{ marginInline: 'auto' }} /> :
      filteredList.length ?
        filteredList.map(employee => {
          return <EmployeeInfo key={employee.id} employee={employee} />
        }) : <Text align="center">No match.</Text>
    }
  </Flex>;
}
