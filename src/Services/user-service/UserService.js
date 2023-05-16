import { myAxios } from "../../Server/MyAxios"

const userServiceModule= {

    logService: async function(employeeId,password){
       
        let data=null;

      await myAxios.post(`/auth/login`,{
            username:employeeId,
            password:password
        }).then((result)=>{
            sessionStorage.setItem("token",result.data.token)
            sessionStorage.setItem("id",employeeId)
            data=result
        })
        return data
    },

    // forgotpassword service starts here

     forgotPasswordService : async function(employeeId3){
        let data=null;
    
     await myAxios.post(`/auth/forgot-password?username=${employeeId3}`).then((result)=> {
        data=result
     }
       )
    return data
    },
    // forgotpassword service ends here
    
    isLogedin: function(){
        if(!sessionStorage.getItem("token")){
            return false
        }
        return true
    },

    shiftTimingsService:async function(weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
        let data=null
       await myAxios.post("/employee/add-shift-timing",{
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

    reportingManager: async function(manager){
        let data=null
        await myAxios.post("/employee/add-reporting-manager",manager).then((res)=>{
            data=res
            //console.log(res)
        })

        return data

    },

    changePassword:async function(empPassword){
       // console.log(empPassword);
       
       return myAxios.post("/employee/change-password",empPassword).then((response) => response.data)
        

    },
    
    updateAbout:async function(about){
       return myAxios.post(`/employee/add-about?about=${about}`).then((response) => response.data)
        },
        
        shiftTimingsService:async function(weekOff,startDate,endDate,shiftStartTime,shiftEndTime){
            let data=null
           await myAxios.post("/employee/add-shift-timing",{
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
        reportingManager: async function(empId,managerId,startDate,endDate){
            // let data=null
           return await myAxios.post("/employee/add-reporting-manager",{"empId":empId,
            "managerId":managerId,
            "startDate":startDate,
            "endDate":endDate}).then((res)=> res.data
                //console.log(res)
                )
    
           
        },
        workingLocation:async function(empId,startDate,endDate,workingFrom,LOCATION){

            return await myAxios.post("/employee/add-work-location",{"empId":empId,"startDate":startDate,"endDate":endDate,"workingFrom":workingFrom,"location":LOCATION})
            .then((res)=>res.data)
     
         }
    
   
    



}




export default userServiceModule
