import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
/*import { TaskProvider } from "./context/tasksContext";
import { AsanaTaskProvider } from "./context/asanatasksContext";*/
import { CustomerProvider } from "./context/customerContext";
import './style/fix.css';
import "./style/AutomationsProfile.css";
import "./style/AutomationsTable.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loading components
/*const HomePage = React.lazy(() => import("./pages/HomePage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const TaskFormPage = React.lazy(() => import("./pages/TaskFormPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const TasksPage = React.lazy(() => import("./pages/TasksPage"));
const CompletedTasks = React.lazy(() => import("./pages/CRM/CompletedTasks"));
const ClientProfile = React.lazy(() => import("./pages/CRM/ClientProfile"));
const Admin = React.lazy(() => import("./pages/CRM/Admin"));
const EditableRows = React.lazy(() => import("./pages/CRM/EditableRows"));
const CustomerTable = React.lazy(() => import("./pages/CRM/CustomerTable"));
const AsanaTasks = React.lazy(() => import("./pages/CRM/AsanaTasks"));*/

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskProvider } from "./context/tasksContext";
import { RunProvider } from "./context/runContext";


import { EditableTable } from "./pages/CRM/.drafts/EditableTable";


import { AsanaTable } from "./pages/CRM/AsanaTable";
import { Admin } from "./pages/CRM/Admin";
import { ClientProfile } from "./pages/CRM/.drafts/ClientProfile";

import { CompletedTasks } from "./pages/CRM/CompletedTasks";
import { AsanaTaskProvider } from "./context/asanatasksContext";

import { CustomerTable } from "./pages/CRM/object-Customer/CustomerTable";
import { CustomerTableRecover } from "./pages/CRM/object-Customer/CustomerTableRecover";
import { CustomerProfile } from "./pages/CRM/object-Customer/CustomerProfile";

import { BillTable } from "./pages/CRM/object-Bill/BillTable";
import { BillProfile } from "./pages/CRM/object-Bill/BillProfile";

import { AutomationsTable } from "./pages/CRM/object-Automations/AutomationsTable";
import { AutomationsProfile } from "./pages/CRM/object-Automations/AutomationsProfile";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AsanaTaskProvider>
          <CustomerProvider>
          <RunProvider>

            <BrowserRouter>
              <main className="container content-container mx-auto px-10 md:px-0">
                <Navbar />
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Public Routes */}

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/tasks" element={<TasksPage />} />
                      <Route path="/add-task" element={<TaskFormPage />} />
                      <Route path="/tasks/:id" element={<TaskFormPage />} />
                      <Route path="/profile" element={<h1>Profile</h1>} />

                    {/* beta */}
                      <Route path="/completed-tasks" element={<CompletedTasks />} />
                     {/* <Route path="/clientprofile" element={<ClientProfile />} /> */}

                       {/* Customers */}
                     <Route path="/customers" element={<CustomerTable />} />
                     <Route path="/customers/erased" element={<CustomerTableRecover />} />
                     <Route path="/customer/:id" element={<CustomerProfile />} />

                      {/* Bills */}
                      <Route path="/bills" element={<BillTable />} />
                     <Route path="/bill/:id" element={<BillProfile />} />


                      <Route path="/admin" element={<Admin />} />
                     {/*  <Route path="/EditableRows" element={<EditableTable />} /> */}
            
                      <Route path="/asana" element={<AsanaTable />} />

                      <Route path="/automations" element={<AutomationsTable />} />
                      <Route path="/automations/:id" element={<AutomationsProfile />} />
                    </Route>
                    {/* Protected Routes */}
                    
                  </Routes>
                </Suspense>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
              </main>
            </BrowserRouter>

          </RunProvider>
          </CustomerProvider>
        </AsanaTaskProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;