import { useEffect, useState } from "react";
import { Employee } from "../types";
import { EmployeeListPane } from "./EmployeeListPane.tsx";
import { Header } from "./Header.tsx";
import { Flex, LoadingOverlay } from "@mantine/core";
import OrgChart from "./OrgChart.tsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { State, fetchEmployee } from "../store/reducer.ts";

function App() {
  //Local data
  const [team, setTeam] = useState<string | null>(null);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  //Store data
  const dispatch = useDispatch()
  const employees = useSelector((state: State) => state.employees, shallowEqual);
  const loading = useSelector((state: State) => state.isLoadingData);

  useEffect(() => {
    dispatch(fetchEmployee())
  }, [dispatch])

  useEffect(() => {
    if (!team) {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter(employee => employee.team === team || !employee.team)
      )
    }
  }, [team, employees]);

  return (
    <>
      <Flex direction="column" sx={{ height: '100vh' }}>
        <Header />
        <Flex sx={{ height: 'calc(100% - 64px)' }}>
          <EmployeeListPane
            employees={employees}
            onTeamSelect={setTeam}
            team={team}
            loading={loading}
          />
          {loading
            ? <LoadingOverlay visible overlayBlur={2} />
            : <OrgChart key={JSON.stringify(filteredEmployees)} employees={employees} team={team} />
          }
        </Flex>
      </Flex>
    </>
  )
}

export default App
