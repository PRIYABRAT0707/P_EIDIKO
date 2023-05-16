import { Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getAllEmployees } from '../../Services/employee-service/EmployeeService'
import { useNavigate } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { TaskTable } from './TaskTable';
import { VerificationTable } from './VerificationTable';
import { taskService } from '../../Services/Employee-Task-Service/taskService';

export const VerificationPending = () => {

const[isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        getAllEmployees().then(
            res => {
                if (res.status == 200 && res.statusMessage === 'success') {
                   setIsLoading(false)
                    setEmployees(res.result)
                } else {
                    setIsLoading(false)
                }
            }
        ).catch(err => {
            setIsLoading(false)
        })
    }, []);

    const textfield1 = { width: 400 }
    const [employee, setEmployee] = useState({
        "fromDate":"",
        "toDate":"",
    });
    const button1 = { backgroundColor: "#2196F3", color: "white", width: "150px",height:"50px",
     borderRadius: "10px",marginTop:"15px",marginRight:"42px" }
     const backbutton=useNavigate()
//---------------------data fetching----------------------------------------

const [VerificationTable1,setVerificationTable1]=useState([])
const [VerificationTable2,setVerificationTable2]=useState([])
async  function fetchData(){
    taskService.getAllVerificationPendingReports().then((res)=>{
      setVerificationTable1(res.result)
    }).catch((error)=>{
  
    })
  }
  
  async  function fetchData2(){
    await taskService.serchingVerificationPendingReports(employee.fromDate,employee.toDate).then((res)=>{
      
      if(res.status===200){
        //toast.success(res.message,{position:toast.POSITION.TOP_CENTER})
        setVerificationTable2(res.result)
      }
      else{
      
        //toast.error(res.message,{position:toast.POSITION.TOP_CENTER})
      }
  
  
    }).catch((error)=>{
    //   toast.error(error.response.data.message,
    //     {
    //         position: toast.POSITION.TOP_RIGHT
    //       }
    //     )
    })
  }

useEffect(()=>{
fetchData()
fetchData2()
},[employee])




const[showingSerchData,setShowingSerchData]=useState(false)
 const [hidden,sethidden]=useState("hidden")
const [message,setMessage]=useState("")


const handleSerchData2=(e)=>{
    e.preventDefault()
  if(employee.fromDate.length>0 && employee.toDate.length>0 && hidden=="hidden" ){
    setShowingSerchData(true)
  }
  else{
   setMessage("Please enter start date and end Date ")
    setShowingSerchData(false)
  }
  

   }
   const [employees, setEmployees] = useState([]);





    return (
        isLoading? <Loading/>:
        <Box sx={{
            height: 200,
            width: '75vw',
            padding: '10px 0px',
         
        }}>
              {/*style={{textAlign:"center",display:"flex",height:"38px",justifyContent:"flex-start"}} */}
                 <Box sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                // marginTop:"10px",marginBottom:"20px"
                marginRight:"30px"
            }}>
             <Typography  
             color={"secondary"}
             style={{marginLeft:"35px",fontSize:"26px"}}>Verification Pending</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/ts")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>

                 {/* <GlobalButton.GlobalDivider/> */}
                
        <Box style={{marginLeft:"25px",width:"95%"}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box>
                
 {/*--------------InputFields:-----------FromDate---ToDate---EmpId-------------------------- */}
 <form onSubmit={handleSerchData2}>
 <input id="someId" type="hidden" name="submit[SomeValue]" value={hidden} />

  <Box
   
    sx={{height:"100px",display:"flex",width:"75vw"}}
    >
      <Grid container  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:"100vw",
            marginLeft:"20px",
            
           
      }}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
            
        
        }}style={textfield1} >
             <TextField InputLabelProps={{ shrink: true }} style={{width:"390px"}} type='date' value={employee.fromDate} onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} label="From Date"></TextField>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker 
                    onChange={(newValue) => setEmployee({
                        ...employee,fromDate:newValue
                    })} 
                    label="From Date "  
                    defaultValue={dayjs(`${employee.fromDate}`)}
                    className='outlined-basic-text-box'  
                    sx={{display:"flex",width:"300px"}}
                    
                />
            </LocalizationProvider> */}
        </Grid >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
            
        
        }} style={textfield1}>
            
<TextField InputLabelProps={{ shrink: true }}  style={{width:"390px"}} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                 <DatePicker 
                    onChange={(newValue) => setEmployee({
                        ...employee,toDate:newValue
                    })} 
                    label="To Date "  
                    defaultValue={dayjs(`${employee.toDate}`)}
                    className='outlined-basic-text-box' 
                    sx={{display:"flex",width:"300px"}}
                />
            </LocalizationProvider> */}
        </Grid >
       
         <Grid item xs={12} sm={12} md={3}  lg={3} xl={3} sx={{
            display: 'flex',
            marginTop:"8px",
            justifyContent: 'flex-end',
            padding:"20px"
        }}>
            <Button variant='outlined' type='submit'
            style={{fontWeight:"bold",color:"#2196F3",
            marginRight:"25px",height:"55px",width:"300px"}} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid>        
      </Grid>
      
      </Box>

      {message.length>0 ? <center> <p style={{ color: "red", fontSize: "19px" }}>{message}</p> </center> :null}
      </form>
      <Box style={{marginLeft:"25px",marginRight:"33px",width:"95%"}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box>
{/*-----------------------Tabel:---------------------------- */}
      {showingSerchData?null :<VerificationTable allTask={VerificationTable1}/>} 

{showingSerchData?<VerificationTable allTask={VerificationTable1}/>:null}
        </Box>


    )
}
 