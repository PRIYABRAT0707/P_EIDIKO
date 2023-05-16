import * as React from 'react';
// import './em.css'
import { 
  Box,
  Grid, 
   Paper,
   Typography,
        } from "@mui/material";

import {FcBusinessman} from "react-icons/fc";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Navigate, useLocation, useNavigate } from 'react-router';
import {Divider} from '@mui/material';
import {Container} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getReportingManagerTable } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import Loading from "../LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { EmployeeAccessLevelService } from '../../Services/employee-service/EmployeAccessLevelService';
import { ReportingManModal } from '../UpdateModals/ReportingManModal';
import {Modal} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ReportingManagerFromProfileData(props) {

  const [reportm,setReportm]=useState(false)

  const handleRmOpen=()=>{
    setReportm(true)
  }


  const[manager,setManager]=useState([])
  const ManagerRowHandler=(params)=>{
    setManager(params.row)
  }


  const columns = [
    { 
      field: 'id',
     headerName: 'Id', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
   
    },
    { 
      field: 'empId',
     headerName: 'Emp Id', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
   
    },
    { 
      field: 'reportingManagerId',
     headerName: 'Manager Id',
     width: 125,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'modifiedBy',
     headerName: 'Modified By', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
  
    },
    { 
      field: 'modifiedDate',
     headerName: 'Modified Date', 
     width: 295,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value).format("DD/MM/YYYY"),
  
     
    },
    { 
      field: 'reportingManagerName',
     headerName: 'Manager Name', 
     width: 295,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
    field: 'startDate',
     headerName: 'Start Date', 
     width: 275,
      flex:2,
     headerClassName:'table-header',
     valueFormatter: params => 
     moment(params?.value ? params.value.slice(0,10):"" ).format("DD/MM/YYYY"),
      
     
    },
    { 
     field: 'endDate',
     headerName: 'End Date', 
     width: 244,
     flex:2,
     headerClassName:'table-header',
     valueFormatter: params =>{
      let enddate=""
     if(params?.value!==null){
      enddate=moment(params.value).format("DD/MM/YYYY")
      return enddate
     }
  else{
    return null
  }
    }
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
                    <ReportingManModal manager={manager} onClose1={()=>{setReportm(false)}} 
                    />
                  </Modal>
                 </IconButton >
  
              </Box>
          );
      }
  }
  
  ];

  


  const {state}=useLocation(props.state)
  const[empId,setEmpId]=useState(state.empId)

  const [reportingManagerTable,setReportingManagerTable]=React.useState([])
  const navigate=useNavigate()

  const[isLoading,setIsLoading]=useState(true)
 
function fetchRMData(empId){
  EmployeeAccessLevelService.ReportingManagerFromProfile(empId).then((res)=>{

    if(res.status===200 && res.statusMessage==="success"){
      setIsLoading(false)
    setReportingManagerTable(res.result)
    }
    else{
      setIsLoading(false)
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    }

  }).catch((err)=>{

  setIsLoading(false)
  })
}

  React.useEffect(()=>{
  fetchRMData(empId)
  },[reportm])




//backbutton
const backbutton=useNavigate()

  return (
    isLoading ?<Loading/>:
    <div className='App'>
      <div style={{ height: 400, width: 'auto' }}>
        <Grid display={"flex"}  alignItems={"center"} justifyItems={"center"} marginTop={"10px"}>
             <Paper elevation={0} style={{ width:'95%', padding: "0px 0px", margin: "0 auto" }}item xs={12}>
                 
             <Box sx={{display:"flex",
                 justifyContent:"space-between",alignContent:"center",
                 marginRight:"1px"}}>
                
                  <center><Typography color={"secondary"} style={{marginLeft:"34px",fontSize:"26px"}}>Reporting Manager</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"1px"}} 
                 onClick={()=>{backbutton(`/user/${empId}`)}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                
                 <Divider color='#2196F3' sx={{ margin: '4px 0px',height:"1px"}}  />

                  <Box style={{height:"54.5vh",width:"auto"}}>

                  
                 <DataGrid 
                  rows={reportingManagerTable}
                  columns={columns} 
                  getRowId={(reportingManagerTable) => reportingManagerTable.id}
                  onRowClick={ManagerRowHandler}    
                    initialState={{
                      ...reportingManagerTable.initialState,
                    pagination: { paginationModel: { pageSize: 8} },
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