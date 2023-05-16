import * as React from 'react';

import { Box,Grid, Modal, Paper} from "@mui/material";
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
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment/moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import WorkShiftTiming from '../WorkInfoModals/WorkShiftTiming';



export default function EmpShiftTime() {
//empid getting
let empId1=sessionStorage.getItem("id")
const[tableData,setTableData]=useState([])
const[manager1,setmanager1]=useState([])
const handleRow=(params)=>{
  setTableData(params.row)
  setmanager1(params.row)
}

 const [shiftTimingsTable,setShiftTimingTable]=React.useState([])
 const[isLoading,setIsLoading]=useState(true)
const navigate=useNavigate()
React.useEffect(()=>{

  getShiftTimingsTable().then((res)=>{
    
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
  
},[])
   //modal for reporting manager updation
   const [profileData, setProfileData] = useState({});
   
const [reportingManagers, setReportingManagers] = useState({})
   const [updateEmployee, setUpdateEmployee] = useState({
    "empId": "",
    "empName": "",
    "emailId": "",
    "contactNo": "",
    "dateOfJoining": ""
})
const [openModal, setOpenModal] = React.useState(false);
const handleModalOpen = () => setOpenModal(true);
const handleModalClose = () => setOpenModal(false);

const [openModal2, setOpenModal2] = React.useState(false);
const handleModal2Open = () => {
    setUpdateEmployee({
        "empId": profileData?.empId,
        "empName": profileData?.empName,
        "emailId": profileData?.emailId,
        "contactNo": profileData?.contactNo,
        "dateOfJoining": profileData?.dateOfJoining
    })
    setOpenModal2(true);
};
const handleModal2Close = () => {
    setOpenModal2(false);
};

   const [reportm,setReportm]= React.useState(false);
   const handleRmOpen =() => setReportm(true);
   const handleRmClose = () => setReportm(false);
   const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
     const textfield1={width: 400}
//------
 //backbutton
 const backbutton=useNavigate()

//--------------------------------------

const columns = [

  // { 
  //   field: "shiftTimingId",
  //  headerName: 'Shift-Id', 
  //  width: 175,
  //  flex:2,
  //  headerClassName:'table-header',

 
  // },
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
   headerClassName:'table-header'
   
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
    headerName: 'Edit',
    width: 119,
    flex:2,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <IconButton variant="contained" color='error'
                    // onClick={(e) => onButtonClick(e, params.row, 'delete')}
                >
               <EditOutlinedIcon onClick={handleRmOpen} color='secondary' sx={{marginRight:"39px"}}/>
                <Modal
                    open={reportm}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                  <WorkShiftTiming empId={empId1} manager={manager1}  onClose1={()=>{setReportm(false)}} 
                  />
                </Modal>
               </IconButton >

            </Box>
            
        );
    }
}
];

//--------------------------------------

  return (
    isLoading ?<Loading/>:
    <div className='App'>
      <div style={{ height: 400, width: '100%' }}>
        <Grid display={"flex"}  alignItems={"center"} justifyItems={"center"} marginTop={"10px"}>
             <Paper elevation={0.5} style={{ width:'95%', padding: "0px 0px", margin: "0 auto" }}item xs={12}>
                 {/* <Grid style={{textAlign:"center",display:"flex",height:"40px",justifyContent:"flex-start"}}>
                     <AccessTimeIcon sx={{
                         fontSize:'75px',
                         borderRadius:'50%',
                         backgroundColor:'#2196F3',
                         color:'white',
                         margin:'0px 0px',
                         padding:'0px'
                     }}/>
                     <center><Typography  style={{marginBottom:"20px",fontSize:"26px",marginTop:"10px"}}>Employee Shift Timings</Typography></center>
                 </Grid> */}
                 <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignContent:"center",
                marginRight:"1px"}}>
                 {/* <Groups2Icon  style={{fontSize:'75px',
                    borderRadius:'50%',
                  backgroundColor:'#2196F3',
                  color:'black',
                 margin:'0px 0px',
                 padding:'0px'}}/> */}
                  <center><Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"34px"}}> Employee Shift Timing</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"0px"}} 
                 onClick={()=>{backbutton("/user/profile")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                 
                 <Divider color='#2196F3' sx={{ margin: '5px 0px',height:"1px"}}  />
                 <Grid style={{textAlign:"right"}}>
                <Button variant='outlined' className='style' style={{marginBottom:"3px",marginTop:"4px"}}  startIcon={<HistoryToggleOffIcon/>} 
                onClick={()=>{navigate("/user/shift-timings")}} >
                            Create Shift 
                </Button>
                </Grid>
               
               
                <Box style={{height:"54.5vh",width:"auto"}} sx={{display:"flex"}}>
                 <DataGrid
                  rows={shiftTimingsTable}
                  columns={columns}
                  getRowId={(shiftTimingsTable) => shiftTimingsTable.shiftTimingId}      
                    initialState={{
                    ...shiftTimingsTable.initialState,
                    pagination: { paginationModel: { pageSize: 8 } },
                  }}
                  onRowClick={handleRow}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                 </Box>
             </Paper>
         </Grid>
      
     </div>
    </div>
  );
}
