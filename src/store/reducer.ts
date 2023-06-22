import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchEmployees, updateManager } from "../api.ts";
import { Employee, RecursiveType } from "../types";

export const fetchEmployee = createAsyncThunk<Employee[]>(
  'employee/fetchAll',
  async () => {
    return fetchEmployees()
  }
)

export const updateEmployeeManager = createAsyncThunk<Employee[], { employeeId: number, newManagerId: number }>(
  'employee/updateManager',
  async ({ employeeId, newManagerId }) => {
    return updateManager(employeeId, newManagerId);
  }
)

export interface State {
  isLoadingData: boolean;
  currentEmployee: null | RecursiveType<Employee>
  employees: Employee[]
}

export const reducers = createSlice({
  name: 'store',
  initialState: {
    isLoadingData: false,
    currentEmployee: null,
    employees: []
  },
  reducers: {
    setCurrentEmployee: (state: State, action) => {
      state.currentEmployee = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state: State) => {
      state.isLoadingData = true
    })
    builder.addCase(fetchEmployee.fulfilled, (state: State, action) => {
      state.isLoadingData = false
      state.employees = action.payload
    })
    builder.addCase(fetchEmployee.rejected, (state: State) => {
      state.isLoadingData = false
    })
  },
})

export const { setCurrentEmployee } = reducers.actions

export default reducers.reducer
