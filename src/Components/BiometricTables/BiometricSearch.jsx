import { Autocomplete, Box, Button, Container, Divider, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/LoadingComponent/Loading'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { getAllEmployees } from '../../Services/employee-service/EmployeeService'
import { useNavigate } from 'react-router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';
import BiometricTable from './BiometricTable';




export const BiometricSearch = () => {

//AutoComplete
const [data, setData]=useState([]);
 const[records,setRecords]=useState();

 useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })

    },[records])
    

const [employees, setEmployees] = useState([]);
const[isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        // console.log("component mounted !!!!")
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

//--------------------fetching all task status -------------------------------------------
const[taskTable,setTaskTable]=useState([])
const[taskTable1,setTaskTable1]=useState([])
const[taskTable2,setTaskTable2]=useState([])

async  function fetchData(){
   await taskService.getAllStatusReport().then((res)=>{
      setTaskTable(res.result)
    }).catch((error)=>{
  
    })
  }

  //------------------------------fetching data with start date end date and emp id -------------------
  async  function fetchData1(){

    await taskService.getStatusReportByDate(employee.empId,employee.fromDate,employee.toDate).then((res)=>{
     
       if(res.status===200){
         setTaskTable1(res.result)
       }
       else{
       }
   
      
     }).catch((error)=>{
     
     })
   }
//---------------------------------------fetching data via start date and Date-----------------------------------------------
async  function fetchData2(){
    await taskService.getStatusReportByDateOnly(employee.fromDate,employee.toDate).then((res)=>{
       if(res.status===200){
       
         setTaskTable2(res.result)
       }
       else{
       
       }
   
      
     }).catch((error)=>{
     
     })
   }

   const [employee, setEmployee] = useState({
    "fromDate":"",
    "toDate":"",
    "empId": ""
});

const[showingSerchData,setShowingSerchData]=useState(false)
const [hidden,sethidden]=useState("")
const [message,setMessage]=useState("")
const [dateSearch,setDateSearch]=useState(false)

// useEffect(()=>{ 
// fetchData()
// fetchData1()
// fetchData2()
// },[employee])


    const button1 = { backgroundColor: "#2196F3", color: "white", width: "150px",height:"50px",
    borderRadius: "10px",marginTop:"15px",marginRight:"42px" }
    const textfield1 = { width: 400 }
    const backbutton=useNavigate()


const handleSerchData=(e)=>{
    e.preventDefault()
 

  if(employee.empId.length>0 && employee.fromDate.length>0 && employee.toDate.length>0 ){

    setShowingSerchData(true)
    setDateSearch(false)
    //setEmployee("")
  
  }
  else if(employee.fromDate.length>0 && employee.toDate.length>0){
    setDateSearch(true)
    setShowingSerchData(false)
  }

  else{
   setMessage("Please enter start date, end Date or empId ")
    setShowingSerchData(false)
    setDateSearch(false)
  }
  

   }
    



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
             <Typography color={"secondary"} style={{marginLeft:"35px",fontSize:"26px"}}>Biometric Details</Typography>

             <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/task-details")}}
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



<form onSubmit={handleSerchData}> 

 <input id="someId" type="hidden" name="input" value="hidden" />
 
  <Box
   
    sx={{height:"100px",display:"flex",width:"75vw"}}
    >
      <Grid container  sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:"100vw",
            marginLeft:"20px",
            
           
      }}>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"9px",
            padding:"20px"
            
        
        }}style={textfield1} >

<TextField InputLabelProps={{ shrink: true }} 
 style={{width:"300px"}} type='date' 
 value={employee.fromDate}
  onChange={(e)=>{setEmployee({ ...employee,fromDate:e.target.value})}} 
  label="From Date"></TextField>
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
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
            
        
        }} style={textfield1}>

<TextField InputLabelProps={{ shrink: true }}  style={{width:"300px"}} type='date' value={employee.toDate} onChange={(e)=>{setEmployee({ ...employee,toDate:e.target.value})}} label="To Date"></TextField>
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
        <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop:"8px",
            padding:"20px"
        
        }} style={textfield1}>
            {/* <TextField value={empId} onChange={(e)=>{setEmpId(e.target.value)}} label="Employee Id" placeholder='Employee Id' 
            sx={{display:"flex",width:"300px"}}></TextField> */}
            <Autocomplete 
            sx={{display:"flex",width:"300px"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                
                                 {...params} 
                                label='Employee Id(Optional)'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                               value={employee.empId}
                               onChange={(e)=>{setEmployee({...employee,empId:e.target.value})}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />}
            />
        </Grid >
       
         <Grid item xs={3} sm={3} md={3}  lg={3} xl={3} sx={{
            display: 'flex',
            marginTop:"8px",
            justifyContent: 'center',
            padding:"20px"
        }}>
            <Button value="click" variant='outlined' type='submit'
             sx={{justifyContent:"center",display:"flex",width:"195px"}} endIcon={<SearchIcon/>}>
            search
                </Button>
                </Grid> 
                 
      </Grid>
      
      
      </Box>
      {message.length>0 ? <center> <p style={{ color: "red", fontSize: "19px" }}>{message}</p> </center> :null}

      </form>

      <Box style={{marginLeft:"25px",marginRight:"33px",width:"95%",}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box>
{/*-----------------------Tabel:---------------------------- */} 
    

  <BiometricTable/>

      



        </Box>
    )
}

 