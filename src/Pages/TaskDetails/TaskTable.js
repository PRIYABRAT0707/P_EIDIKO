import { Box, FormControlLabel, FormGroup } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DataGrid } from '@mui/x-data-grid';
//import { getTaskStatus } from '../../Services/TaskService/TaskService';
import { Navigate, useNavigate } from 'react-router';
import { taskService } from '../../Services/Employee-Task-Service/taskService';
import { toast } from 'react-toastify';
import moment from 'moment';

//icon button color changer

const verfiedIcon=(data)=>{
  return data==null? <TaskAltIcon  style={{backgroundColor:"red",color:"white",borderRadius:"50%"}}/> : 
  <TaskAltIcon  style={{backgroundColor:"green",color:"white",borderRadius:"50%"}}/>
    }

  const columns = [
    
    { 
      field: 'taskDetailsId',
     headerName: 'Task Details Id', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
   
    },
    { 
      field: 'empId',
     headerName: 'Employee Id', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
   
    },
    { 
      field: 'taskDetail',
     headerName: 'Task Details',
     width: 210,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'desc',
     headerName: 'Description',
     width: 210,
      flex:2,
     headerClassName:'table-header'
     
    },
    { 
      field: 'status',
     headerName: 'Status', 
     width: 125,
      flex:2,
     headerClassName:'table-header'
  
    },
    { 
      field: 'reason',
     headerName: 'Reason', 
     width: 210,
      flex:2,
     headerClassName:'table-header'
  
    },
    { 
        field: 'assignedDate',
       headerName: 'Assigned Date', 
       width: 125,
        flex:2,
       headerClassName:'table-header',
       valueFormatter: params => 
       moment(params?.value).format("DD/MM/YYYY"),   
      },
    { 
        field: 'statusReportDate',
       headerName: 'Status Reporting Date', 
       width: 125,
        flex:2,
       headerClassName:'table-header',
       valueFormatter: params => 
       moment(params?.value).format("DD/MM/YYYY"),   
      },
   
      { 
        field: 'team',
       headerName: 'Team', 
       width: 125,
        flex:2,
       headerClassName:'table-header'
       
      },
      { 
        field: 'assignedBy',
       headerName: 'AssignedBy', 
       width: 140,
        flex:2,
       headerClassName:'table-header'
       
      },
    
    {
      field: 'verifiedBy',
      headerName: 'Verified',
      width: 140,
      flex:2,
      headerClassName: 'table-header',
      renderCell: (params) => {
          return (
            <FormGroup>
            <FormControlLabel required control={verfiedIcon(params.value)}  />
           </FormGroup>
           );
          //   <FormGroup>
          //   <FormControlLabel required control={<TaskAltIcon />} />
          // </FormGroup>
          // );
      }
  }
  ];


 
  



export const TaskTable = (props) => {
  
  // const [isLoading,setIsLoading]=useState(true)

  const navigate=useNavigate()
 let data=props.allTask
const [taskTable,setTaskTable]=useState([])


useEffect(()=>{setTaskTable(data)},[data])



const handleRowClick = (params) => {
navigate(`../task-details`,{state:params.row})

};


    return (
        <Box sx={{
            height: 200,
            width: '75vw',
            padding: '10px 0px',
        }}>
        <Box style={{height:"54.5vh",width:"95%",marginLeft:"33px",marginTop:"10px"}}>
        <DataGrid
        rows={taskTable}
        columns={columns}
        getRowId={(taskTable)=>taskTable.taskDetailsId}
        initialState={{
           ...taskTable.initialState,
         pagination: { paginationModel: { pageSize: 8} },
       }}
       pageSizeOptions={[8,15,25,50,75]}
       onRowClick={handleRowClick}

        >
           
        </DataGrid>
       </Box>
       </Box>
    )
}


