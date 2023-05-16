import { myAxios } from "../../Server/MyAxios"

export const createEmployee = (employee) => {
    //console.log(employee)
    return myAxios.post(`employee/create`,employee).then((response) => response.data)
}

export const  updateEmployeeService = (employee) => {
    //console.log(employee)
    return myAxios.put(`access/employee/update-employee`,employee).then((response) => response.data)
}

export const  deleteEmployeeService = (empId) => {
    //console.log(employee)
    return myAxios.delete(`access/employee/delete-employee/${empId}`).then((response) => response.data)
}


export const getAllEmployees = () => {   
    return myAxios.get(`employee/get-all-employee?sortBy=empId&pageSize=1000&pageNo=0`).then((response) => response.data)
}

export const getShiftTimingsTable=()=>{
    return myAxios.get(`/employee/get-shift-timings`).then((res)=>res.data)

}

export const getEmployeeWorkLocationTable=()=>{
    return myAxios.get(`/employee/get-work-location`).then((res)=>res.data)

}
export const getReportingManagerTable=()=>{
    return myAxios.get(`/employee/get-reporting-manager`).then((res)=>res.data)
}