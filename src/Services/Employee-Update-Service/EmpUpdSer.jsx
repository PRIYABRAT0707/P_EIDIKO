import { myAxios } from "../../Server/MyAxios";

export const EmpUpdateService={

    updateWorkingLocation:async function(empWorkLocationId,empId,startDate,endDate,workingFrom,LOCATION){

        return await myAxios.put("access/employee/update-working-location",{"empWorkLocationId":empWorkLocationId,"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
        .then((res)=>res.data)
 
     },
     updateReportingManager: async function(empId,managerId,startDate,endDate,reportingManagerId){
        // let data=null
       return await myAxios.put("access/employee/update-reporting-manager",{"empId":empId,
        "managerId":managerId,
        "startDate":startDate,
        "endDate":endDate,
        "reportingManagerId":reportingManagerId
    }).then((res)=> res.data
            //console.log(res)
            )

       
    },
    updateShiftTimingsService:async function(empId,weekOff,startDate,endDate,shiftStartTime,shiftEndTime,shiftTimingId){
        let data=null
       await myAxios.put("/access/employee/update-shift-timing",{
            "empId":empId,    
            "weekOff":weekOff,
            "startDate":startDate,
            "endDate":endDate,
            "shiftStartTime":shiftStartTime,
            "shiftEndTime":shiftEndTime,
            "shiftTimingId":shiftTimingId

        }).then((result)=>{

            data=result}
       
        )
        return data

    },
    updateContact:async function(contact,empId){
        return await myAxios.post(`/access/update-contactno/${empId}?contactNo=${contact}`).then((res)=>res.data)
    }


}