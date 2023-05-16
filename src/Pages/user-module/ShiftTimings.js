
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Box,Container,Typography } from '@mui/material';
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


export default function ShiftTimings(){
const navigate=useNavigate()
    // const hour1=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const minute1=[0,15,30,45,60]
    const textfield1 = { width: 400 }

    const button1={backgroundColor:"#2196F3",color:"white",borderRadius:"20px",marginBottom:"20px",width:"22%"}

    const[checkValue,setCheckValue]=useState([])
    const[startTime,setStartTime]=useState({"startHour":"","startMinute":""})
    const[endTime,setEndTime]=useState({"endHour":"","endMinute":""})
    const getime11=(e)=>{setStartTime({...startTime, [e.target.name]: e.target.value})}
    const getTime12=(e)=>{setEndTime({...endTime, [e.target.name]: e.target.value})}
    const [startDate,setstartDate]=useState(new Date("2000-01-01"))
    const [endDate,setEndDate]=useState(new Date("2000-01-01"))
    const [isLoading,setIsLoading]=useState(false)

    const [message,setMessage]=useState("")

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
    
      const [state, setState] =useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    

      const shiftTimingsHandle=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        let startTime3=startTime.startHour+":"+startTime.startMinute+":"+"00"
        let endTime3=endTime.endHour+":"+endTime.endMinute+":"+"00"
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

setEndDate(new Date("2000-01-01"))
      }
       //backbutton
 const backbutton=useNavigate()

return(
  isLoading ? <Loading/> :
    <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>





    <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignContent:"center",
                marginRight:"1px"}}>
                
                  <center><Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"34px"}}>Shift Timing</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"20px"}} 
                 onClick={()=>{backbutton("/user/employee-shift-timing-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
    <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />



<Container style={{padding:"2px",marginTop:"10px"}}>
  <form onSubmit={shiftTimingsHandle}>
                <Paper elevation={0} style={{width:"auto"}} >

                <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={2}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
   }}>




<FormControl component="fieldset">

     
<FormLabel component={"center"} >
        <Typography variant='h5' color="#2196F3" >Week off</Typography>
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
     {/* {checkValue.length===2 ? document.getElementsByName("weekoff").item((e)=>e.disabled):document.getElementsByName("weekoff")} */}

   </Grid>
   {message.length !==0 ? <p style={{ color: "red", fontSize: "19px" }}>{message}</p>:null}

   {/* <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            <TextField value={shiftTimings} onChange={getData} className='outlined-basic-text-box' id="outlined-basic" label="Employee Id" variant="outlined"  sx={{width:400}}/>
                        </Grid> */}

   <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker onChange={getData} id="start-date1" label="Start Date" defaultValue={dayjs('2023-01-01')} className='outlined-basic-text-box'  sx={{width:400}} />
                            </LocalizationProvider> */}
                            <TextField className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={textfield1} type='date'
                                        value={startDate}
                                        onChange={(event) =>setstartDate(event.target.value)}
                                    />

     </Grid >
     <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker onChange={getData} label="End Date" defaultValue={dayjs('2023-01-01')} className='outlined-basic-text-box'  sx={{width:400}} />
                            </LocalizationProvider> */}

<TextField className='outlined-basic-text-box' id="outlined-basic1" label="End Date" variant="outlined" style={textfield1} type='date'
                                        value={endDate}
                                        onChange={(event) => {setEndDate(event.target.value)}}
                                    />  

     </Grid >


     <Grid item xs={12} sx={{display:'flex',justifyContent:'center',
                        alignItems:'center'
                        
   
   }}>


<Box sx={{width:400}}>
<Typography variant='h6'>Shift Start</Typography>

 
        <TextField required name="startHour"  value={startTime.startHour} onChange={getime11} label="Hour" type="number"  InputProps={{ inputProps: { max:23,min:0} }} sx={{width:190}}></TextField>
   

 <FormControl sx={ {width: 190,marginLeft:2.5 }}>
<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select value={startTime.startMinute} onChange={getime11}
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
    <Box sx={{width:400}}>

<Typography variant='h6'>Shift End</Typography>

 
        <TextField required name="endHour" value={endTime.endHour} onChange={getTime12} label="Hour"  type="number"  InputProps={{ inputProps: { max:23,min:0} }} sx={{width:190}}></TextField>
   

 <FormControl sx={ {width: 190,marginLeft:2.5 }}>
<InputLabel id="demo-multiple-name-label">Minute</InputLabel>
        <Select
        required
        name="endMinute"
        value={endTime.endMinute}
          labelId="demo-multiple-name-label"
          id="demo-multiple-end"
          onChange={getTime12} >
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
                            <Button  type="submit" variant="contained" style={button1}>Update</Button>
                        </Grid>

                        {/* <Typography variant='h4'  style={{color: {message} === "Processed Successfully" ? "green":"red" ,fontSize:"19px"}}>{message}</Typography> */}

    







               </Grid>



</Box>

</Paper>
</form>
</Container>
</Box>
)


}