import { Employee, RecursiveType } from "../types";
import { EmployeeBlock } from "./EmployeeBlock.tsx";
import { CSSProperties, useEffect, useState } from "react";

export function OrgChartBlock({ employee, parentHasDeeperChildren, parentHasMultipleChildren, onBoundingRect }: {
  employee: RecursiveType<Employee>;
  parentHasDeeperChildren: boolean;
  parentHasMultipleChildren?: number;
  onBoundingRect?: (conf: DOMRect) => void;
}) {
  const [bounds, setBounds] = useState<DOMRect[]>([]);
  const [lineEl, setLineEl] = useState<JSX.Element | null>();

  const ticks: ('top' | 'left' | 'bottom' | 'bottom-left')[] = [];
  if (parentHasDeeperChildren) {
    ticks.push('top');
  }
  if (employee.hasDeeperChildren) {
    ticks.push('bottom')
  } else {
    if (employee.reporters.length > 1) {
      ticks.push('bottom-left')
    } else {
      employee.reporters.length !== 0 && ticks.push('bottom')
    }
  }
  if (!parentHasDeeperChildren && !employee.reporters.length) {
    parentHasMultipleChildren && parentHasMultipleChildren > 1 ? ticks.push('left') : ticks.push('top')
  }

  useEffect(() => {
    if (!employee.reporters.length || bounds.length !== employee.reporters.length) {
      return;
    }
    const firstEl = bounds[0];
    const lastEl = bounds[bounds.length - 1];

    setLineEl(() => {
      if (employee.reporters.length === 1) {
        return null;
      }
      return employee.hasDeeperChildren
        ? <div
          className='line line--horizontal'
          style={{
            left: firstEl.left + (firstEl.width / 2) - 260 + 'px',
            top: firstEl.top - 80 + 'px',
            width: lastEl.left - firstEl.left + 1 + 'px',
            height: '1px'
          }}
        ></div>
        : <div
          className='line line--vertical'
          style={{
            left: firstEl.left - 275 + 'px',
            top: firstEl.top - 79 + 'px',
            width: '1px',
            height: lastEl.bottom - firstEl.top - 13 + 'px'
          }}
        ></div>
    })
  }, [bounds, employee.hasDeeperChildren, employee.reporters.length]);

  let blockChildrenHolderStyle: CSSProperties;
  if (!employee.hasDeeperChildren) {
    if (employee.reporters.length === 1) {
      blockChildrenHolderStyle = { marginInlineStart: '0', marginBlockStart: '16px' }
    } else {
      blockChildrenHolderStyle = { marginInlineStart: '64px', marginBlockStart: '16px' }
    }
  } else {
    blockChildrenHolderStyle = { marginBlockStart: '32px' }
  }

  return <div
    className="flex flex-dir-col align-center"
    style={{ marginBlockEnd: '12px', marginInline: '8px' }}
  >
    <EmployeeBlock
      draggable
      employee={employee}
      isBlock
      tickPos={ticks}
      onBoundingRect={(val) => onBoundingRect?.(val)}
    />
    {lineEl}
    {employee.reporters.length ?
      <div
        className={`flex align-start justify-center ${!employee.hasDeeperChildren ? 'flex-dir-col' : ''}`}
        style={blockChildrenHolderStyle}
      >
        {employee.reporters.map((innerEmployee, index) => (
          <OrgChartBlock
            key={innerEmployee.id}
            employee={innerEmployee}
            parentHasDeeperChildren={employee.hasDeeperChildren}
            parentHasMultipleChildren={employee.reporters.length}
            onBoundingRect={(bound) => setBounds((val) => {
              val[index] = bound;
              return val;
            })}
          />
        ))}
      </div>
      : null
    }
  </div>
}
