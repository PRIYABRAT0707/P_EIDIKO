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
import { Navigate, useNavigate } from 'react-router';
import {Divider} from '@mui/material';
import {Container} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import {IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getReportingManagerTable } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const columns = [
  { 
    field: 'empId',
   headerName: 'Employee Id', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
 
  },
  { 
    field: 'biometricReportId',
   headerName: 'Biometric Id',
   width: 125,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'biometricDate',
   headerName: 'Biometric Date', 
   width: 200,
    flex:2,
   headerClassName:'table-header'

  },
  { 
    field: 'checkInTime',
   headerName: 'CheckIn Time', 
   width: 295,
    flex:2,
   headerClassName:'table-header',
//    valueFormatter: params => 
//    moment(params?.value).format("DD/MM/YYYY"),

   
  },
  { 
    field: 'checkOutTime',
   headerName: 'Checkout Time', 
   width: 295,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
  field: 'totalWorkingTime',
   headerName: 'Total Working Time', 
   width: 300,
    flex:2,
   headerClassName:'table-header',
//    valueFormatter: params => 
//    moment(params?.value ? params.value.slice(0,10):"" ).format("DD/MM/YYYY"),

   
  },
  { 
   field: 'isLate',
   headerName: 'Late', 
   width: 125,
   flex:2,
   headerClassName:'table-header',
//    valueFormatter: params => 
//    moment(params?.value).format("DD/MM/YYYY"),

  },
  { 
    field: 'modifiedOn',
   headerName: 'Modified On', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'month',
   headerName: 'Month', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
   
  },
  { 
    field: 'year',
   headerName: 'Year', 
   width: 125,
    flex:2,
   headerClassName:'table-header'
   
  },

];


export default function BiometricTable(props) {

  const [biometricTable1,setBiometricTable1]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)



  React.useEffect(()=>{

    getReportingManagerTable().then((res)=>{
     
      if(res.status===200 && res.statusMessage==="success"){
        setIsLoading(false)
      //setBiometricTable1(res.result)
      
      
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
    
  },[])




//backbutton
const backbutton=useNavigate()

  return (
    <Box sx={{
        height: 200,
        width: '75vw',
        padding: '10px 0px',
    }}>
    <Box style={{height:"54.5vh",width:"95%",marginLeft:"33px",marginTop:"10px"}}>
    <DataGrid
    rows={biometricTable1}
    columns={columns}
    getRowId={(biometricTable1)=>biometricTable1.biometricReportId}
    initialState={{
       ...biometricTable1.initialState,
     pagination: { paginationModel: { pageSize: 8} },
   }}
   pageSizeOptions={[8,15,25,50,75]}

    >
       
    </DataGrid>
   </Box>
   </Box>
  );
}

