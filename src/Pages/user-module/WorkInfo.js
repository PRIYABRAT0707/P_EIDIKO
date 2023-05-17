import { Autocomplete, Grid } from "@mui/material";
import {TextField} from "@mui/material";
import { LocalizationProvider,TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {Box} from "@mui/material";
import {FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import { useEffect, useState } from "react";
import {Typography} from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import {Container,Paper,Button} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import userServiceModule from "../../Services/user-service/UserService";
import Swal from "sweetalert2";
import { helpFunction } from "../../Components/HelperComponent/helpFunction";
import {Divider} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router";
import Loading from "../../Components/LoadingComponent/Loading";
import AutoEmpSearch from "../../Services/AutoEmpSearch/AutoEmpSearch";
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import RemoveIcon from '@mui/icons-material/Remove';


export default  function WorkInfo(){
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
    const button1={backgroundColor:"#2196F3",color:"white",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400}
    const[empId,setEmpId]=useState("")
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const[workingFrom,setWorkingFrom]=useState("")
    const[location,setLocation]=useState("")
   const[isLoading,setIsLoading]=useState(false)

    const navigate=useNavigate()
  
const workinFromHandle=(e)=>{
    setWorkingFrom(e.target.value)
}


    const [state, setState] =useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    
   const workInfoHandle=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(endDate)
    userServiceModule.workingLocation(empId,startDate,endDate1,workingFrom,location).then((res)=>{
       
        if(res.status===201 && res.statusMessage==='success' ){
            setIsLoading(false)
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
          })
           // setMessage(res.data.message)
          }
          else{
            setIsLoading(false)
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: res.message,
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

//backbutton
const backbutton=useNavigate()
 //AutoComplete
 const[managerId,setManagerId]=useState("")
 const [data, setData]=useState([]);
 const[records,setRecords]=useState();
 console.log(managerId)
 
 useEffect(()=>{
   AutoEmpSearch(records).then((res)=>{
     setData(res.data.result)
   })
     },[records])
    return(
        isLoading ? <Loading/> :
        
<Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>


<Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignContent:"center",
                marginRight:"30px"}}>
                  <center><Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"34px"}}>WORKING LOCATION</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/employee-work-location-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>

<Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />

<Container style={{padding:"20px"}}>
                <Paper elevation={0} style={{width:"auto"}} >
<form onSubmit={workInfoHandle}>
                <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={3}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
                <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Autocomplete 
                                    sx={{display:"flex"}}
                                    options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                InputProps={{ inputProps: { maxLength:50,minLength:5} }}
                                sx={{width:400}}
                                required
                                 value={managerId}
                                 {...params} 
                                 label="Employee Id"
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                                type='text'
                                onChange={(e)=>{setEmpId(e.target.value)}} 
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                        </Grid>

                        <Grid  item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                         <TextField required className='outlined-basic-text-box' id="outlined-basic" label="Start Date" variant="outlined" style={textfield1} type='date'
                                        value={startDate}
                                        onChange={(event) =>setstartDate(event.target.value)}
                                    />
                        </Grid>
                     
                        <Grid item xs={12}className='form-group row'
             sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                                marginRight:"209px"
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
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }

                 <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                                <FormControl sx={{display:'flex',width:400}}>
                                    <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={wl}
                                        label="WorkLocation"
                                        name="workingfrom"
                                      onChange={workinFromHandle}
                                      value={workingFrom}

                                    >
                                        <MenuItem value="CLIENT_LOCATION" >CLIENT_LOCATION</MenuItem>
                                        <MenuItem   value="WFO">WFO</MenuItem>
                                        <MenuItem   value="WFH">WFH</MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>

                         {workingFrom==="CLIENT_LOCATION" ? 
                        <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            <TextField value={location} onChange={(e)=>{setLocation(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic" label="Location" variant="outlined" style={textfield1} />
                        </Grid>

                        :null
 
                        }
                             
                        
                    


                        <Grid item xs={12} sx={{display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                            <Button type="submit" variant="contained" style={button1}>Update</Button>
                        </Grid>

                       </Grid>


                        </Box>
            </form>

</Paper>
</Container>

</Box>
    )



}