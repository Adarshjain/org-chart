import { Employee, RecursiveType } from "../types";
import '../styles/Employee.css';
import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, setCurrentEmployee, setDraggedState, State, updateEmployeeManager } from "../store/reducer.ts";
import { isValidDropTarget } from "../tree.ts";
import EmployeeInfo from "./EmployeeInfo.tsx";

type EmployeeItemProps = {
  employee: Employee;
  isBlock?: boolean;
  tickPos?: ('top' | 'left' | 'bottom' | 'bottom-left')[];
  onBoundingRect?: (conf: DOMRect) => void;
  draggable?: boolean;
}

export function EmployeeBlock(
  {
    employee,
    isBlock,
    tickPos,
    onBoundingRect,
    draggable
  }: EmployeeItemProps
) {
  const draggedEmployee = useSelector(
    (state: State) => state.currentEmployee
  ) as Employee | null;
  const dispatch = useDispatch()

  const [isValidDrop, setIsValidDrop] = useState(false);

  const blockClass = isBlock ? ' employee-item--block' : '';
  const tickClass = tickPos ? tickPos.map(pos => ` employee-item--tick-${pos}`).join('') : '';
  const finalClassNames = `flex drop-target ${blockClass}${tickClass}${draggable ? ' relative' : ''}`;

  //Set drag state to false when destroyed
  useEffect(() => () => {
    dispatch(setDraggedState(false))
  });

  useEffect(() => {
    if (!draggedEmployee || !employee) {
      setIsValidDrop(false);
      return
    }
    setIsValidDrop(isValidDropTarget(draggedEmployee as RecursiveType<Employee>, employee))
  }, [draggedEmployee, employee])

  const onDragStart = (event: SyntheticEvent) => {
    (event.target as HTMLDivElement).classList.add('employee-item--transparent-line');
    dispatch(setCurrentEmployee(employee));
    dispatch(setDraggedState(true));
  }

  const onDragEnd = (event: SyntheticEvent) => {
    (event.target as HTMLDivElement).classList.remove('employee-item--transparent-line');
    dispatch(setCurrentEmployee(null));
    dispatch(setDraggedState(false));
  }

  const onDragOver = (e: SyntheticEvent) => {
    if ((e.target as HTMLDivElement).closest('.drop-target') && isValidDrop) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const onDrop = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isValidDrop) {
      return;
    }
    dispatch(updateEmployeeManager({ employeeId: draggedEmployee?.id as number, newManagerId: employee.id }))
    dispatch(fetchEmployee());
  }

  const ref = (el: HTMLElement | null) => {
    if (!el) return;
    onBoundingRect?.(el.getBoundingClientRect())
  }

  return <div
    draggable={draggable}
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    onDragOver={onDragOver}
    onDrop={onDrop}
    className={finalClassNames}
    ref={ref}
  >
    <EmployeeInfo employee={employee} />
  </div>
}
