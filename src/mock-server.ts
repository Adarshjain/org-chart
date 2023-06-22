import { createServer, Request } from "miragejs"
import { Employee } from "./types";

export const createMockServer = () => {

  const employeeData: Employee[] = [
    {
      id: 1000,
      name: 'Mark Hill',
      designation: 'Chief Executive Officer',
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Mia'
    },
    {
      id: 1001,
      name: 'Joe Linux',
      designation: 'VP - Engineering',
      team: 'Engineering',
      manager: 1000,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Salem'
    },
    {
      id: 1002,
      name: 'Linda May',
      designation: 'VP - Product Management',
      team: 'Product',
      manager: 1000,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Gizmo'
    },
    {
      id: 1003,
      name: 'John Green',
      designation: 'VP - Sales',
      team: 'Sales',
      manager: 1000,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Oliver'
    },
    {
      id: 1004,
      name: 'Ron Blomquist',
      designation: 'Engineer Manager',
      team: 'Engineering',
      manager: 1001,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Muffin'
    },
    {
      id: 1005,
      name: 'Michael Rubin',
      designation: 'Engineer Manager',
      team: 'Engineering',
      manager: 1001,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Jasmine'
    },
    {
      id: 1006,
      name: 'Alice Lopez',
      designation: 'Sr. Product Manager',
      team: 'Product',
      manager: 1002,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Mimi'
    },
    {
      id: 1007,
      name: 'Mary Johnson',
      designation: 'Principal Product Manager',
      team: 'Product',
      manager: 1002,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Sam'
    },
    {
      id: 1008,
      name: 'Kirk Douglas',
      designation: 'Product Manager',
      team: 'Product',
      manager: 1007,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Maggie'
    },
    {
      id: 1009,
      name: 'Tim Apple',
      designation: 'Director of Sales',
      team: 'Sales',
      manager: 1003,
      avatar: 'https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Lola'
    }
  ]

  createServer({
    routes() {
      this.namespace = "api"

      this.get("/employees", () => {
        return employeeData;
      });

      this.post('/employee', (_, request: Request) => {
        const { employeeId, newManagerId } = JSON.parse(request.requestBody)
        const match = employeeData.find(employee => employee.id === employeeId);
        if (match) {
          match.manager = newManagerId;
        }
        return employeeData;
      })
    },
  })
}
