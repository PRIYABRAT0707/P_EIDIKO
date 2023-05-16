import { myAxios } from "../../Server/MyAxios";

export const EmployeeAccessLevelService={
 
    WorkingLocationFromProfile:async function(empId){
        return myAxios.get(`access/employee/get-work-location/${empId}`).then((res)=>res.data)
    },
    
    ShiftTimingsFromProfile:async function(empId){
        return myAxios.get(`access/employee/get-shift-timings/${empId}`).then((res)=>res.data)
    },

    ReportingManagerFromProfile:async function(empId){
        return myAxios.get(`access/employee/get-reporting-manager/${empId}`).then((res)=>res.data)
    },


}