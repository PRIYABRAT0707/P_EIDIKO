import * as React from 'react';

import { Box,Grid, Paper} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import {Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {Divider} from '@mui/material';
import {Typography} from '@mui/material';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { getShiftTimingsTable } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Loading from "../LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment/moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { EmployeeAccessLevelService } from '../../Services/employee-service/EmployeAccessLevelService';
import { useLocation } from 'react-router';
import {Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ShiftTimingModal } from '../UpdateModals/ShiftTimingModal';


export default function EmpShiftTimingfromProfileData(props) {

  const [reportm,setReportm]=useState(false)

  const handleRmOpen=()=>{
    setReportm(true)
  }
  const[shiftTiming,setShiftTiming]=useState([])
  const ManagerRowHandler=(params)=>{
    setShiftTiming(params.row)
  }

  
  const columns = [
    { 
      field: "shiftTimingId",
     headerName: 'Shift-Id', 
     width: 175,
     flex:2,
     headerClassName:'table-header',
  
   
    },
    { 
      field: 'startDate',
     headerName: 'Start Date',
     width: 200,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
     
    },
    { 
      field: 'endDate',
     headerName: 'End Date', 
     width: 200,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     {
      let enddate=""
      if(params?.value!==null){
       enddate=moment(params?.value).format("DD/MM/YYYY")
      return enddate
      }
   else{
     return null
   }
     }
  
    },
    { 
      field: 'shiftStartTime',
     headerName: 'shiftStartTime', 
     width: 200,
     flex:2,
     headerClassName:'table-header',
     renderCell: (params) => (
      params.value ? params.value.slice(0,5):"")
  
     
    },
    { 
      field: 'shiftEndTime',
     headerName: 'Shift End Time', 
     width: 214,
     flex:2,
     headerClassName:'table-header',
     renderCell: (params) => (
      params.value ? params.value.slice(0,5):"")
  
     
    },
    { 
      field: 'weekOff',
     headerName: 'Week-Off', 
     width: 250,
     flex:2,
     headerClassName:'table-header',

     renderCell: (params) => {
     let data=params.formattedValue
     let data1=data.slice(0,1)
     let data2=data.slice(2,3)
     
     if(data1==1 && data2==2){
      return "Monday,Tuesday"
     }


     }
  
    },
    {
      field: 'modifiedBy',
     headerName: 'Modified By', 
     width: 200,
     flex:2,
     headerClassName:'table-header'
  
    },
    
    {
      field: 'edit',
      headerName: 'Update',
      width: 119,
      flex:2,
      headerClassName: 'table-header',
      renderCell: (params) => {
          return (
              <Box sx={{
                  display: 'flex',
                  justifyContent: 'center'
              }}>
                  <IconButton variant="contained" color='error'>
                 <EditIcon onClick={handleRmOpen} color='secondary' sx={{marginRight:"39px"}}/>
                  <Modal
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                    <ShiftTimingModal manager={shiftTiming} empId={empId} onClose1={()=>{setReportm(false)}} 
                    />
                  </Modal>
                 </IconButton >
  
              </Box>
          );
      }
  }
  
  ];


 const [shiftTimingsTable,setShiftTimingTable]=React.useState([])
 const[isLoading,setIsLoading]=useState(true)
const navigate=useNavigate()
const {state}=useLocation(props.state)
const[empId,setEmpId]=useState(state.empId)


function fetchDataOfShift(empId){
  EmployeeAccessLevelService.ShiftTimingsFromProfile(empId).then((res)=>{

    if(res.status===200 && res.statusMessage==="success"){
      setIsLoading(false)
    setShiftTimingTable(res.result)
    
    }
    else{
      setIsLoading(false)  
    
    }

  }).catch((err)=>{
    setIsLoading(false)  
  
  })
}


React.useEffect(()=>{
fetchDataOfShift(empId)
  
},[reportm])

 //backbutton
 const backbutton=useNavigate()
  return (
    isLoading ?<Loading/>:
    <div className='App'>
      <div style={{ height: 400, width: '100%' }}>
        <Grid display={"flex"}  alignItems={"center"} justifyItems={"center"} marginTop={"10px"}>
             <Paper elevation={0} style={{ width:'95%', padding: "0px 0px", margin: "0 auto" }}item xs={12}>
                 
                 <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignContent:"center",
                marginRight:"1px"}}>
                 
                  <center><Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"34px"}}> Employee Shift Timing</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"0px"}} 
                 onClick={()=>{backbutton(`/user/${empId}`)}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                 
                 <Divider color='#2196F3' sx={{ margin: '5px 0px',height:"1px"}}  />
                
                <Box style={{height:"54.5vh",width:"auto"}} sx={{display:"flex"}}>
                 <DataGrid
                  rows={shiftTimingsTable}
                  columns={columns}
                  onRowClick={ManagerRowHandler}
                  getRowId={(shiftTimingsTable) => shiftTimingsTable.shiftTimingId}      
                    initialState={{
                    ...shiftTimingsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                 </Box>
             </Paper>
         </Grid>
      
     </div>
    </div>
  );
}