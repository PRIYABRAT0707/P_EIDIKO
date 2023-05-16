
import Forgot from "./Pages/user-module/Forgot"
import Login from "./Pages/user-module/Login";
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Pages/user-module/Profile";
import ResponsiveAppBar from "./Components/Navbar/Navbar";
import Homepage from "./Pages/Home-module/homepage";
import UserRoute from "./Pages/user-module/UserRoute";
import { theme } from "./Components/stylecomponent/theme";
import CreateEmployee from "./Pages/Employee/CreateEmployee";
import { ThemeProvider } from "@emotion/react";
import WorkInfo from "./Pages/user-module/WorkInfo";
import ShiftTimings from "./Pages/user-module/ShiftTimings";
import ReportingManager from "./Pages/user-module/ReportingManager";
import ResetPassword from "./Pages/user-module/ResetPassword";
import DataUpload from "./Pages/user-module/DataUpload";
import Loading from "./Components/LoadingComponent/Loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Employees from "./Pages/Employee/Employees";
import Employee from "./Pages/Employee/Employee";
import DailyReport from "./Pages/TaskDetails/DailyReport";
import ReportingMangr from "./Components/Tables/ReportingMangr";
import EmpShiftTime from "./Components/Tables/EmpShiftTime";
import EmpWorkLocation from "./Components/Tables/EmpWorkLocation";
import { TaskStatus} from "./Pages/TaskDetails/TaskStatus";
import {VerificationPending} from "./Pages/TaskDetails/VerificationPending"
import {StatusPending} from "./Pages/TaskDetails/StatusPending"
import {Errorr} from "./Components/error/Errorr";
import BiometricTable from "./Components/BiometricTables/BiometricTable";
import { BiometricSearch } from "./Components/BiometricTables/BiometricSearch";
import TaskDetailsElaborately from "./Components/TaskComponent/TaskDetailsElaborately";
import EmpShiftTimingfromProfileData from "./Components/EmployeeDataFromProfile/EmpShiftTimingfromProfileData";
import EmpWorkLocationFromProfile from "./Components/EmployeeDataFromProfile/EmpWorkLocationFromProfile";
import ReportingManagerFromProfileData from "./Components/EmployeeDataFromProfile/ReportingManagerFromProfileData";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/error" element={<Errorr/>}/>
        

       {/* <Route path="reporting-manager-data" element={< ReportingMangr />} /> */}
       

        <Route path="/user" element={<UserRoute />}>
          <Route index path="profile" element={<Profile />} />
          <Route index path="create-employee" element={<CreateEmployee />} />
          <Route index path="workinfo" element={<WorkInfo />} />
          <Route index path="shift-timings" element={<ShiftTimings />} />
          <Route index path="reporting-manager" element={<ReportingManager></ReportingManager>}></Route>
          <Route index path="change-password" element={<ResetPassword />} />
          <Route index path="employees" element={<Employees />} />
          <Route index path=":id" element={<Employee />} />
          <Route index path="reporting-manager-data" element={< ReportingMangr />} />
          <Route index path="employee-shift-timing-data" element={< EmpShiftTime />} />
          <Route index path="employee-work-location-data" element={< EmpWorkLocation />} />
          <Route index path="daily-report" element={<DailyReport />} />
          <Route index path="ts" element={<TaskStatus/>}/>
          <Route index path="vp" element={<VerificationPending/>}/>
          <Route index path="sp" element={<StatusPending/>}/>
          <Route index path="biometric" element={<DataUpload />} />
          <Route index path="biometric-data" element={<BiometricTable/>}/>
          <Route index path="biometric-search" element={<BiometricSearch/>}/>
          <Route index path="task-details" element={<TaskDetailsElaborately/>}/>
          <Route index path="employee-shiftTiming-via-profile" element={<EmpShiftTimingfromProfileData/>}/>
          <Route index path="employee-workingLocation-via-profile" element={<EmpWorkLocationFromProfile/>}/>
          <Route index path="employee-reportingManager-via-profile" element={<ReportingManagerFromProfileData/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
     
   
    </ThemeProvider>



  );
}

export default App;
