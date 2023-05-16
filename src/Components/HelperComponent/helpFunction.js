export const helpFunction={

    endDateManipulation: function (endDate){
        let date=null
    
        if(endDate.getTime===new Date("2000-01-01").getTime){
            let k=endDate.toISOString()
            date=k.replace(k,"null")
            return date
        } else{
            
            return  date=endDate
        }
       } 

}