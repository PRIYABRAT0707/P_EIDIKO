import { Box, Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import userServiceModule from '../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { GlobalButton } from '../stylecomponent/GlobalButton';
import {Divider} from '@mui/material';
import { EmpUpdateService } from '../../Services/Employee-Update-Service/EmpUpdSer';
import Loading from '../LoadingComponent/Loading';
import { helpFunction } from '../HelperComponent/helpFunction';
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export const ShiftTimingModal = (props) => {


   //------EndDate
   const[visible,setVisible]=useState(false);
   const[status,setStatus]=useState("click")
 
   const handlelerButton=(e)=>{
 if(status==="click"){
  setVisible(true)
   setStatus("")
 }
 else if(status!==1){
 setVisible(false)
  setStatus("click")
 }
   }
   //------------

    const [initialStartDate,setInitialStartDate]=useState("")
      const[initialEndDate,setInitialEndDate]=useState("")
     const [initialShiftStartTime,setInitialShiftStartTime]=useState({"startHour":"","startMinute":""})
      const[initialShiftEndTime,setInitialShiftEndTime]=useState({"endHour":"","endMinute":""})
const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
const textfield1={width: 400}
const minute1=[0 ,15,30,45,60]
const[checkValue,setCheckValue]=useState([])

  const handlechange=(e)=>{
    const { value, checked } = e.target;

    let arr1=checkValue
    if(checked){
      arr1.push(value)
      setCheckValue(arr1)
    }
    else{
   arr1=arr1.filter((e)=>e!==value)
    setCheckValue(arr1)
    }
  }

const[isLoading,setIsLoading]=useState(false)
const[message,setMessage]=useState("")
const [empId,setEmpId]=useState(props.empId)
let func1=props.onClose1

  const shiftTimingsModalHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(initialEndDate)
     let startTime3=initialShiftStartTime.startHour+":"+initialShiftStartTime.startMinute+":"+"00"
      let endTime3=initialShiftEndTime.endHour+":"+initialShiftEndTime.endMinute+":"+"00"


      if(checkValue.length===2){
    EmpUpdateService.updateShiftTimingsService(empId,checkValue,initialStartDate,endDate1,startTime3,endTime3).then((res)=>{
       
      if(res.status===200 && res.data.statusMessage==='success'){
        setIsLoading(false)
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      func1()

      }
      else{
        setIsLoading(false)
        toast.error(res.data.message, {
          position: toast.POSITION.TOP_CENTER
      });
      func1()

      }
    }).catch((error)=>{
      setIsLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
    });
    func1()
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




    return (
      isLoading?<Loading/>:
        <Card style={{maxWidth:500, padding: "10px 5px", margin: "0 auto" ,marginTop:"12px"}}>
        <CardContent>
            <center>
                <Grid>
                <Typography style={{fontSize:"25px"}}  color="primary">
            UPDATE SHIFT TIMINGS
        </Typography>
                <p>
                <GlobalButton.GlobalDivider/></p>
                </Grid>

               
                <Container style={{padding:"0px"}}>
        <form onSubmit={shiftTimingsModalHandle}>
                        <Paper elevation={0} style={{width:"auto"}} >

                        <Box sx={{ flexFlow: 1 }}>
                        <Grid container spacing={1} gap={1.5}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                        <Grid item xs={12} sx={{display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
        <FormControl component="fieldset">

            <FormLabel component="center" sx={{justifyContent:'center',alignContent:'center',display:'flex',alignContent:'center'}}>

                <Typography variant='h5' color="#2196F3">Week off</Typography>
                </FormLabel>

            <FormGroup id="check-box-data" aria-label="position" row  >
            
                <FormControlLabel
                control={<Checkbox />}
                label="Mon"
                name="weekoff"
                value="1"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Tue"
                name="weekoff"
                value="2"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Wed"
                name="weekoff"
                value="3"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Thur"
                name="weekoff"
                value="4"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Fri"
                name="weekoff"
                value="5"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Sat"
                name="weekoff"
                value="6"
                onChange={handlechange}
                />
                <FormControlLabel
                control={<Checkbox />}
                label="Sun"
                name="weekoff"
                value="7"
                onChange={handlechange}
                />
            </FormGroup>
            </FormControl>
        </Grid>
        {message.length !==0 ? <p style={{ color: "red", fontSize: "19px" }}>{message}</p>:null}
        <Grid item xs={12} sx={{display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                    <TextField InputLabelProps={{shrink: true,}}
                                     className='outlined-basic-text-box' id="outlined-basic" 
                                     label="Start Date" variant="outlined" style={textfield1} type='date'
                                                value={initialStartDate}
                                                onChange={(e) =>{setInitialStartDate(e.target.value)}}
                                            />
                                           

            </Grid >
            
            <Grid item xs={12}className='form-group row'
             sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                                marginRight:"199px"
                            }}>

                     <Grid className='col-sm-2  mt-2'>
                      
                      {
                        status==="click"?<Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         :
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                      }
                     <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

                   
                 </Grid>
                  </Grid>
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                            }}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={textfield1} type='date'
                                      value={initialEndDate}
                          onChange={(e) => {setInitialEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }


            <Grid item xs={12} sx={{display:"block",justifyContent:'center',
                                alignItems:'center'}}>
        <Box sx={{width:400, marginTop:'0px'}}>
        <Typography variant='h6'>Shift Start</Typography>
                <TextField name="startHour"  value={initialShiftStartTime.startHour} onChange={(e)=>{setInitialShiftStartTime({...initialShiftStartTime,startHour:e.target.value})}} label="Hour" type="number"  InputProps={{ inputProps: { max:23,min:0} }} sx={{width:190}}></TextField>
        <FormControl sx={ {width: 190,marginLeft:2.5 }}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select value={initialShiftStartTime.startMinute}                 
                onChange={(e)=>{setInitialShiftStartTime({...initialShiftStartTime ,startMinute:e.target.value})}} 
                labelId="demo-multiple-name-label"
                id="demo-multiple-start"
                name="startMinute" >
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
         {/* this grid for shift end time */}

        <Grid item xs={12} sx={{display:"block",justifyContent:'center',
                                alignItems:'center'}}>
            <Box sx={{width:400,marginTop:'0px'}}>
        <Typography variant='h6'>Shift End</Typography>
        <TextField name="endHour" value={initialShiftEndTime.endHour} onChange={(e)=>{setInitialShiftEndTime({...initialShiftEndTime,endHour:e.target.value})}} label="Hour"  type="number"  InputProps={{ inputProps: { max:23,min:0} }} sx={{width:190}}></TextField>
        <FormControl sx={ {width: 190,marginLeft:2.5 }}>
        <InputLabel id="demo-multiple-name-label">Minute</InputLabel>
                <Select
                name="endMinute"
                value={initialShiftEndTime.endMinute}
                labelId="demo-multiple-name-label"
                id="demo-multiple-end"
                onChange={(e)=>{setInitialShiftEndTime({...initialShiftEndTime ,endMinute:e.target.value})}} >
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
                                 
                <Button sx={{marginTop:"10px"}} type="submit" variant="contained"   style={GlobalButton.OperationButton} >UPDATE</Button>
               <Button sx={{marginLeft:"20px",marginTop:"10px"}} onClick={props.onClose1} variant='contained'  style={GlobalButton.HaltButton}>Cancel</Button>
              
             </Grid>
            

      </Grid>

        </Box>

        </Paper>
        </form>
        </Container>
      <GlobalButton.GlobalDivider/>
            </center>
        </CardContent>
        
    </Card>
    )
}
