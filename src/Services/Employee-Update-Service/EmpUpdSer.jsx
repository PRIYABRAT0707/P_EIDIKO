import { myAxios } from "../../Server/MyAxios";

export const EmpUpdateService={

    updateWorkingLocation:async function(empId,startDate,endDate,workingFrom,LOCATION){

        return await myAxios.post("access/employee/add-work-location",{"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
        .then((res)=>res.data)
 
     },
     updateReportingManager: async function(empId,managerId,startDate,endDate){
        // let data=null
       return await myAxios.post("access/employee/add-reporting-manager",{"empId":empId,
        "managerId":managerId,
        "startDate":startDate,
        "endDate":endDate}).then((res)=> res.data
            //console.log(res)
            )

       
    },
    updateShiftTimingsService:async function(empId,weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
        let data=null
       await myAxios.post("/access/employee/add-shift-timing",{
            "empId":empId,    
            "weekOff":weekOff,
            "startDate":startDate,
            "endDate":endDate,
            "shiftStartTime":shiftStartTime,
            "shiftEndTime":shiftEndTime

        }).then((result)=>{

            data=result}
       
        )
        return data

    },
    updateContact:async function(contact,empId){
        return await myAxios.post(`/access/update-contactno/${empId}?contactNo=${contact}`).then((res)=>res.data)
    }


}