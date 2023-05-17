
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box,Card,CardContent,Container,Typography } from '@mui/material';
import {Paper,Grid} from '@mui/material';
import {Checkbox} from '@mui/material';
import {FormControl,FormLabel,FormGroup,FormControlLabel} from '@mui/material';
import {InputLabel} from '@mui/material';
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import userServiceModule from '../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import {Divider} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import Loading from '../../Components/LoadingComponent/Loading';
import { GlobalButton } from '../stylecomponent/GlobalButton';


export default function WorkShiftTiming(props){
//-------------------------------
const[manager1,setManager1]=useState(props.manager)

const[empId,setEmpId]=useState(props.empId)
const[weekOff,setWeekOff]=useState(manager1.weekOff)







    //-------------------------
const navigate=useNavigate()
    
    const minute1=["00",15,30,45,60]
    const textfield1 = { width: 500 }

    const button1={backgroundColor:"#2196F3",color:"white",borderRadius:"20px",marginBottom:"20px",width:"29.5%"}
    const button2={backgroundColor:"#FF2400",color:"white",borderRadius:"20px",marginBottom:"20px",width:"29.5%"}

    const[checkValue,setCheckValue]=useState([])
    // const[startTime,setStartTime]=useState(manager1.shiftStartTime)//{"startHour":"","startMinute":""}
    // const[endTime,setEndTime]=useState(manager1.shiftEndTime)
    // const getTime11=(e)=>{setStartTime({...startTime, [e.target.name]: e.target.value})}
    // const getTime12=(e)=>{setEndTime({...endTime, [e.target.name]: e.target.value})}
    const [startDate,setstartDate]=useState(manager1.startDate)//new Date("2000-01-01")
    const [endDate,setEndDate]=useState(manager1.endDate)
    const [isLoading,setIsLoading]=useState(false)

    const [message,setMessage]=useState("")
 

    const [shiftStartTime,setShiftStartTime]=useState
    ({"startHour":manager1.shiftStartTime.slice(0,2),"startMinute":manager1.shiftStartTime.slice(3,5)})
      
    const[shiftEndTime,setShiftEndTime]=useState
    ({"endHour":manager1.shiftEndTime.slice(0,2),"endMinute":manager1.shiftEndTime.slice(3,5)})
      const handlechange=(e)=>{
        const { value, checked } = e.target;

        let arr1=checkValue
        // let a=document.getElementsByName("weekoff");
        if(checked){
          arr1.push(value)
          setCheckValue(arr1)

          // if(checkValue.length>=2){
           
          //   for( let i=2;i<a.length;i++){
          //     a[i].disabled=true;
          //   }
          // }

          //console.log(checkValue)
        }
        else{
       arr1=arr1.filter((e)=>e!==value)
        setCheckValue(arr1)
        }
      }
    
      const [state, setState] =useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    

      const shiftTimingsHandle=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        let startTime3=shiftStartTime.startHour+":"+shiftStartTime.startMinute+":"+"00"
        let endTime3=shiftEndTime.endHour+":"+shiftEndTime.endMinute+":"+"00"
        let endDate1=helpFunction.endDateManipulation(endDate)


        if(checkValue.length===2){

        userServiceModule.shiftTimingsService(checkValue,startDate,endDate1,startTime3,endTime3).then((res)=>{
    
          if(res.status===200 && res.data.statusMessage==='success' ){
            setIsLoading(false)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500,
              open:true
          })
           // setMessage(res.data.message)
          }
          else{
            setIsLoading(false)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: res.data.message,
              showConfirmButton: false,
              timer: 1500
          }
          )

          }
        }).catch((error)=>{
          setIsLoading(false)
          Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

        })

      }
      else if(checkValue.length===0){
        setIsLoading(false)
        setMessage("please select  week off")
      }
      else if(checkValue.length===1){
        setIsLoading(false)
        setMessage("You need to select atleast 2 week off")

      }
      else{
        setIsLoading(false)
        setMessage("you can select maximum 2 week off")
      }


      }
  
       //backbutton
 const backbutton=useNavigate()

return(
  isLoading ? <Loading/> :
  <Card style={{ maxWidth: 670, padding: "1px 0px", margin: "0 auto" ,marginTop:"45px"}}>
        <CardContent>


     <center>
            <Grid>
            
                 <Typography style={{fontSize:"25px",marginBottom:"10px"}} color="primary">
                 Shift Timing
                 </Typography>     
            </Grid>
            </center>
            <GlobalButton.GlobalDivider/>
<Container style={{padding:"20px"}}>
  <form onSubmit={shiftTimingsHandle}>
                <Paper elevation={0} style={{width:"auto"}} >

                <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={1} 
                 justifyContent={"center"} 
                 alignItems={"center"} alignContent={"center"}>
                    <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
   }}>
        <FormControl component="fieldset">

     
        <FormLabel component={"center"} >
        <Typography variant='h5' color="#2196F3" >Week off</Typography>
        </FormLabel>  

        <FormGroup 
        value={weekOff} onChange={(e)=>{setWeekOff(e.target.value)}}
        id="check-box-data" aria-label="position" row  >
      
        <FormControlLabel
          control={<Checkbox />}
          label="Mon"
          name="weekoff"
          value="Mon"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Tue"
          name="weekoff"
          value="Tue"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Wed"
          name="weekoff"
          value="Wed"
          onChange={handlechange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Thur"
          name="weekoff"
          value="Thur"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Fri"
          name="weekoff"
          value="Fri"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Sat"
          name="weekoff"
          value="Sat"
          onChange={handlechange}
        />
         <FormControlLabel
          control={<Checkbox />}
          label="Sun"
          name="weekoff"
          value="Sun"
          onChange={handlechange}
        />
      </FormGroup>

    </FormControl>
     {/* {checkValue.length===2 ? document.getElementsByName("weekoff").item((e)=>e.disabled):document.getElementsByName("weekoff")} */}

   </Grid>
   {message.length !==0 ? <p style={{ color: "red", fontSize: "19px" }}>{message}</p>:null}
   <Grid item xs={12} 
                 sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                     }}>
                        <TextField required value={empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
                        label="Employee Id" variant="outlined" style={textfield1} disabled type='number'
                        onChange={(e)=>{setEmpId(e.target.value)}} ></TextField>
                    </Grid>

   <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                          
                            <TextField InputLabelProps={{shrink: true,}} className='outlined-basic-text-box' id="outlined-basic" 
                            label="Start Date" variant="outlined" style={textfield1} type='date'
                                        value={startDate}
                                        onChange={(event) =>setstartDate(event.target.value)}
                                    />

     </Grid >
     <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                           

<TextField InputLabelProps={{shrink: true,}} className='outlined-basic-text-box' id="outlined-basic1" label="End Date" variant="outlined" style={textfield1} type='date'
                                        value={endDate}
                                        onChange={(event) => {setEndDate(event.target.value)}}
                                    />  
</Grid >
<Grid item xs={12} sx={{display:'flex',justifyContent:'center',
                        alignItems:'center'
   }}>

<Box sx={{width:500}}>
<Typography variant='h6'>Shift Start</Typography>
 <TextField required name="startHour"  value={shiftStartTime.startHour}  
 onChange=
 {(e)=>{setShiftStartTime({...shiftStartTime,startHour:e.target.value})}}
 label="Hour" type="number"  InputProps={{ inputProps: { max:23,min:0} }} 
 sx={{width:240}}></TextField>
 <FormControl sx={ {width: 240,marginLeft:2.5 }}>
<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select value={shiftStartTime.startMinute} 
         onChange=
         {(e)=>{setShiftStartTime({...shiftStartTime,startMinute:e.target.value})}}
          labelId="demo-multiple-name-label"
          id="demo-multiple-start"
          name="startMinute"
          required
        >
          {minute1.map((minute1) => (
            <MenuItem
              key={minute1}
              value={minute1}
            >
              {minute1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
   </Box>
   </Grid>
{/*  this grid for shift end time */}

<Grid item xs={12} sx={{display:'flex',justifyContent:'center',
                        alignItems:'center'
                        
}}>
    <Box sx={{width:500}}>

<Typography variant='h6'>Shift End</Typography>
<TextField required name="endHour" value={shiftEndTime.endHour}
onChange={(e)=>{setShiftEndTime({...shiftEndTime,endHour:e.target.value})}}
 label="Hour"  type="number"  
InputProps={{ inputProps: { max:23,min:0} }} sx={{width:240}}></TextField>
<FormControl sx={ {width: 240,marginLeft:2.5 }}>
<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select
        required
        name="endMinute"
        value={shiftEndTime.endMinute}
onChange={(e)=>{setShiftEndTime({...shiftEndTime,endMinute:e.target.value})}}
          labelId="demo-multiple-name-label"
          id="demo-multiple-end"
        >
          {minute1.map((minute2) => (
            <MenuItem
              key={minute2}
              value={minute2}
            >
              {minute2}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
   </Box>
 </Grid>

 <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={button1}>UPDATE</Button>

                        <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={button2}>Cancel</Button>
                    </Grid>

                        {/* <Typography variant='h4'  style={{color: {message} === "Processed Successfully" ? "green":"red" ,fontSize:"19px"}}>{message}</Typography> */}
               </Grid>

</Box>

</Paper>
</form>
</Container>
</CardContent>
</Card>
)


}



































// import { Box, Button, Card, CardContent, Container, Grid, Paper, TextField, Typography } from '@mui/material'
// import React from 'react'
// import Person3Icon from '@mui/icons-material/Person3';
// import { useState } from 'react';
// import userServiceModule from '../../Services/user-service/UserService';
// import Swal from 'sweetalert2';
// import { GlobalButton } from '../stylecomponent/GlobalButton';
// import {Divider} from '@mui/material';
// import Loading from '../../Components/LoadingComponent/Loading';
// import { helpFunction } from '../../Components/HelperComponent/helpFunction';
// import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
// import { toast } from "react-toastify";


// export const WorkShiftTiming = (props) => {


//   const[managerId,setManagerId]=useState(props.manager)
//   const [initialStartDate,setInitialStartDate]=useState(function stringToDate(){
//     let sd=props.startdate
    
//     return new Date(sd).toISOString().slice(0, 10)
//   })

//   const[initialEndDate,setInitialEndDate]=useState(function stringToDate(){
//     let ed=props.enddate
    
//     return new Date(ed).toISOString().slice(0,10)
//   })
// //   const [initialStartTime,setInitialStartTime]=useState(function stringToTime(){
// //     let st=props.starttime
    
// //     return new TimeRanges(st).toISOString().slice(0, 5)
// //   })
// //   const [initialEndTime,setInitialEndTime]=useState(function stringToTime(){
// //     let et=props.endtime
    
// //     return new TimeRanges(et).toISOString().slice(0, 5)
// //   })
// const [initialStartTime,setInitialStartTime]=
// useState({"startHour":props.shiftstart.slice(0,2),"startMinute":props.shiftstart.slice(3,5)})
      
// const[initialEndTime,setInitialEndTime]=
// useState({"endHour":props.shiftend.slice(0,2),"endMinute":props.shiftend.slice(3,5)})

// const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
//   const textfield1={width: 400}

    
//  const [state, setState] =useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//     });
 
// const { vertical, horizontal, open } = state;
// const[empId,setEmpId]=useState(props.empId)
// const [isLoading,setIsLoading]=useState(false)
// // const[modalClose,setModalClose]=useState(props.onClose1)



// const reportingManagerModalHandle=(e)=>{
//     e.preventDefault()
//     setIsLoading(true)
//     let endDate1=helpFunction.endDateManipulation(initialEndDate)
//     EmpUpdateService.updateReportingManager(empId,managerId,initialStartDate,endDate1).then((res)=>{
//         if(res.status===201 && res.statusMessage==='success'){

//             setIsLoading(false)
//             // setModalClose(true)
//             toast.success(res.message, {
//                 position: toast.POSITION.TOP_CENTER
//               });
//             // Swal.fire({
//             //     position: 'center',
//             //     icon: 'success',
//             //     title: res.message,
//             //     showConfirmButton: false,
//             //     timer: 1500 })
//             }
//         else{

//             setIsLoading(false)
//             toast.error(res.message, {
//                 position: toast.POSITION.TOP_CENTER
//             });
//             }
//              }).catch((error)=>{

//                 setIsLoading(false)
//                 toast.error(error.response.data.message, {
//                     position: toast.POSITION.TOP_CENTER
//                 });
//      })}



//     return (
//         isLoading?<Loading/>:
//         <Card style={{ maxWidth: 670, padding: "13px 5px", margin: "0 auto" ,marginTop:"55px"}}>
//         <CardContent>
//             <center>
//             <Grid>
//                  <Typography style={{fontSize:"25px",marginBottom:"10px"}} color="primary">
//                  Shift Timings
//                  </Typography>     
//             </Grid>
//             </center>
//             <GlobalButton.GlobalDivider/>
//         <Container style={{padding:"20px"}}>
//             <form onSubmit={reportingManagerModalHandle}>
//             <Paper elevation={0} style={{width:"auto"}} >

//               <Box sx={{ flexFlow: 1 }}>
//                 <Grid container spacing={1} gap={1}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
//                  <Grid item xs={12} 
//                  sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                      }}>
//                         <TextField required value={props.empId} name="empId"  className='outlined-basic-text-box' id="outlined-basic" 
//                         label="Shift Id" variant="outlined" style={textfield1} disabled type='number' ></TextField>
//                     </Grid>
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialStartDate} onChange={(e)=>{setInitialStartDate(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Start Date" variant="outlined" 
//             style={textfield1} type='date' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                 <TextField className='outlined-basic-text-box' id="outlined-basic1" 
//                 label="End Date" variant="outlined" style={textfield1} type='date'
//                 value={initialEndDate} onChange={(e)=>{setInitialEndDate(e.target.value)}} />  
//                 </Grid >

//                 <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialStartTime} onChange={(e)=>{setInitialStartTime(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Shift-Start-Time" variant="outlined" 
//             style={textfield1} type='time' />  
//                     </Grid >
                    

//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required value={initialEndTime} onChange={(e)=>{setInitialEndTime(e.target.value)}} 
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="Shift-end-time" variant="outlined" 
//             style={textfield1} type='time' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//             <TextField required  
//             className='outlined-basic-text-box' id="outlined-basic1" 
//             label="week-off" variant="outlined" 
//             style={textfield1} type='week' />  
//                     </Grid >
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                         <TextField required value={props.managerId} 
//                         onChange={(e)=>{setManagerId(e.target.value)}} 
//                         className='outlined-basic-text-box' id="outlined-basic" 
//                         label="Modified By" variant="outlined" 
//                         style={textfield1} type='number' />
//                     </Grid>

                   
                
//                     <Grid item xs={12} sx={{display:'flex',
//                     justifyContent:'center',
//                     alignItems:'center'
//                 }}>
//                         <Button sx={{marginTop:"10px"}} type='submit' disableElevation variant="contained" style={button1}>UPDATE</Button>

//                         <Button  sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
//                     </Grid>
//                     {/* <Grid item xs={12} sx={{justifyContent:"right",display:"flex"}}>
//                          <Button onClick={handleRmClose} style={{marginRight:"32px",color:"red",fontWeight:"bold"}}>Cancel</Button>
//                         </Grid> */}
//                 </Grid>
//             </Box>
//             </Paper>
//             </form>
//         </Container>
//         <GlobalButton.GlobalDivider/>
//         </CardContent>
//         </Card>

//     )
// }
