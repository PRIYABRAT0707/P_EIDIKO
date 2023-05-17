import * as React from 'react';
// import './em.css'
import { 
  Box,
  Grid, 
   Modal, 
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getReportingManagerTable } from '../../Services/employee-service/EmployeeService';
import { toast } from 'react-toastify'
import Loading from "../../Components/LoadingComponent/Loading";
import { useState } from 'react';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { WorkReportingManager } from '../WorkInfoModals/WorkReportingManager';




export default function ReportingMangr() {
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

const[tableData,setTableData]=useState([])
const[manager1,setmanager1]=useState([])
const handleRow=(params)=>{
  setTableData(params.row)
  setmanager1(params.row)
}
//--------------------------------------
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
   headerName: 'Manager Id- Name',
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
   moment(params?.value).format("DD/MM/YYYY"),
  //  renderCell: (params) => (
  //   params.value ? params.value.slice(0,10):"")

   
  },
  { 
   field: 'endDate',
   headerName: 'End Date', 
   width: 244,
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
    field: 'modifiedDate',
   headerName: 'Modified Date', 
   width: 295,
    flex:2,
   headerClassName:'table-header',
   valueFormatter: params => 
   moment(params?.value).format("DD/MM/YYYY"),

   
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 119,
    flex:2,
    marginLeft:5,
    headerClassName: 'table-header',
    renderCell: (params) => {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
              
                <IconButton variant="contained" color='secondary'
                    // onClick={(e) => onButtonClick(e, params.row, 'delete')}
                >
            
                    <EditOutlinedIcon onClick={handleRmOpen} sx={{marginRight:"39px"}}/>
                  <Modal
                      open={reportm}
                      aria-labelledby="parent-modal-title"
                      aria-describedby="parent-modal-description">
                    <WorkReportingManager manager1={manager1} onClose1={()=>{setReportm(false)}} 
                    empId={profileData?.empId} manager={reportingManagers?.empId}
                      startdate={reportingManagers?.startDate? 
                      reportingManagers?.startDate:null} 
                      enddate={reportingManagers?.endDate ? reportingManagers?.endDate:null}/>
                  </Modal>
              
                </IconButton >

            </Box>
        );
    }
}
];



  //------------------------------------

  const [reportingManagerTable,setReportingManagerTable]=React.useState([])
  const navigate=useNavigate()
  const[isLoading,setIsLoading]=useState(true)
  React.useEffect(()=>{

    getReportingManagerTable().then((res)=>{
      if(res.status===200 && res.statusMessage==="success"){
        setIsLoading(false)
      setReportingManagerTable(res.result)
      
      
      }
      else{
        setIsLoading(false)
      //   toast.error(res.message, {
      //     position: toast.POSITION.TOP_RIGHT
      // })
      }
  
    }).catch((err)=>{
  
    setIsLoading(false)
    })
    
  },[])


console.log(reportingManagerTable)

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
                 onClick={()=>{backbutton("/user/profile")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
                
                 <Divider color='#2196F3' sx={{ margin: '4px 0px',height:"1px"}}  />


                 <Grid style={{textAlign:"right"}}>
                <Button variant='outlined' className='style' style={{marginBottom:"3px",marginTop:"4px"}} 
                startIcon={<Person4Icon></Person4Icon>} 
                onClick={()=>{navigate(`/user/reporting-manager`,{state:tableData})}} >
                            CREATE REPORTING MANAGER
                </Button>
                </Grid>
                  
                  <Box style={{height:"54.5vh",width:"auto"}}>

                  
                 <DataGrid 
                  rows={reportingManagerTable}
                  columns={columns} 
                  getRowId={(reportingManagerTable) => reportingManagerTable.id}    
                    initialState={{
                      ...reportingManagerTable.initialState,
                    pagination: { paginationModel: { pageSize: 8} },
                    
                  }}
                  onRowClick={handleRow}
                  pageSizeOptions={[8,15,25,50,75]}
                 />
                </Box>

                {/* <Divider color='secondary' sx={{ marginTop: '50px' }} /> */}

             </Paper>
         </Grid>
      
     </div>
    </div>
  );
}