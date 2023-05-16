
import { Box, Button, Container, Divider, IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { getAllEmployees } from '../../Services/employee-service/EmployeeService'
import { toast } from 'react-toastify'
import './employee.css'
import { Navigate, useNavigate } from 'react-router'
import { Create, Delete } from '@mui/icons-material'
import Swal from 'sweetalert2';
import Groups2Icon from '@mui/icons-material/Groups2';
import {Grid} from '@mui/material'
import Loading from "../../Components/LoadingComponent/Loading";
import moment from 'moment/moment'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { deleteEmployeeService } from '../../Services/employee-service/EmployeeService'


const onButtonClick = (e, row, action) => {
    e.stopPropagation();
    e.preventDefault();
    if (action === 'delete') {

        Swal.fire({
            title: 'Do you want to delete this ' + row.empId,
            showCancelButton: true,
            confirmButtonText: 'Delete',

            
        })

        .then((result) => {
            if (result.isConfirmed) {
                deleteEmployeeService(row.empId).then((res)=>{
                
                    if(res.status===200){
                        Swal.fire('Deleted!', '', 'success')
                    }
                    else{
                        Swal.fire("Employee doesn't exist",'',"error")
                    }
                })
                
            }
        })
    }
};

const columns = [
    {
        field: 'empId',
        headerName: 'Emp Id',
        width: 120,
        flex:2,
        headerClassName: 'table-header',

    },
    {
        field: 'empName',
        headerName:'Name',
        label: 'Name',
        width: 300,
        flex:2,
        headerClassName: 'table-header',
    },
    {
        field: 'emailId',
        headerName:'Email',
        label: 'Email',
        width: 300,
        flex:2,
        headerClassName: 'table-header',
    },
    {
        field: 'dateOfJoining',
        headerName:'Date Of Joining',
        label: 'Date Of Joining',
        width: 200,
        flex:2,
        headerClassName: 'table-header',
        valueFormatter: params => 
        moment(params?.value).format("DD/MM/YYYY"),
    },
    {
        field: 'contactNo',
        label: 'Contact',
        width: 200,
        flex:2,
        headerName:'Contact',
        headerClassName: 'table-header',
    },
    {
        field: 'createdBy',
        label: 'Created By',
        headerName:'Created By',
        width: 100,
        flex:2,
        headerClassName: 'table-header',
    },
    {
        field: 'status',
        label: 'Status',
        headerName:'Status',
        width: 100,
        flex:2,
        headerClassName: 'table-header',
    },
    {
        field: 'actions',
        headerName: 'Actions',
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
                        onClick={(e) => onButtonClick(e, params.row, 'delete')}
                    ><Delete /></IconButton >

                </Box>
            );
        }
    }
];
const Employees = () => {

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

    const navigate = useNavigate();
    const NavigateCreateEmployee = () => {
        navigate('../create-employee')
    }
    const handleRowClick = (params) => {
        navigate(`../${params.id}`)
    };
const backbutton=useNavigate()

    return (
        isLoading? <Loading/>:
        <Box sx={{
            height: 400,
            width: '100%',
            padding: '10px 0px'
        }}>
             <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                alignContent:"center",
                marginRight:"30px"}}>
                 {/* <Groups2Icon  style={{fontSize:'75px',
                    borderRadius:'50%',
                  backgroundColor:'#2196F3',
                  color:'black',
                 margin:'0px 0px',
                 padding:'0px'}}/> */}
                  <center><Typography  color={"secondary"} style={{fontSize:"26px",marginLeft:"34px"}}>Employees</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/profile")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>
            {/* <Container sx={{
                display: 'flex',
                justifyContent: 'space-between'

            }}>

                <Typography variant='h5'>
                    Employees
                </Typography>

                <Button variant="outlined" startIcon={<FaUserPlus />} onClick={NavigateCreateEmployee}>
                    Create Employee
                </Button>

            </Container> */}
            <Box style={{marginLeft:"33px",width:"95%"}}>
            <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />
            </Box>
            <Grid style={{textAlign:"right",marginRight:"42px"}}>
                <Button variant='outlined'className='style' style={{color:"#2196F3",marginBottom:"3px",marginTop:"4px"}} startIcon={<FaUserPlus />} onClick={NavigateCreateEmployee} >
                Create Employee 
                </Button>
                </Grid>
            <Box style={{height:"54.5vh",width:"auto",marginLeft:"35px",marginRight:"40px"}}>
                <DataGrid sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer'
                    }
                }}
                    rows={employees}
                    columns={columns}
                    pageSize={8}
                    getRowId={(employee) => employee.empId}
                    rowsPerpageOptions={[8, 15, 25]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 8 } },
                    }}
                    pageSizeOptions={[8, 15, 25]}
                    onRowClick={handleRowClick}
                //checkboxSelection
                >



                </DataGrid>


            </Box>
            {/* <Box style={{marginLeft:"35px",width:"95%",marginTop:"50px"}}>
            <Divider color='secondary' sx={{ margin: '1px 0px' }} />
            </Box> */}
        </Box>
    )
}

export default Employees