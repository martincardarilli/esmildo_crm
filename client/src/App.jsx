import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
/*import { TaskProvider } from "./context/tasksContext";
import { AsanaTaskProvider } from "./context/asanatasksContext";*/

import './style/fix.css';
import "./style/AutomationsProfile.css";
import "./style/AutomationsTable.css";
import "./style/AddEditModal.css";
import './style/Table.css';
import './style/Estados.css';
import './style/HardDeleteControl.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";



import { TaskProvider } from "./context/tasksContext";








import { Admin } from "./pages/CRM/admin/Admin";





import { CustomerTable } from "./pages/CRM/object-Customer/CustomerTable";
import { CustomerTableRecover } from "./pages/CRM/object-Customer/CustomerTableRecover";
import { CustomerProfile } from "./pages/CRM/object-Customer/CustomerProfile";
import { CustomerProvider } from "./context/customerContext";

import { PropiedadTable } from "./pages/CRM/object-Propiedad/PropiedadTable";
import { PropiedadTableRecover } from "./pages/CRM/object-Propiedad/PropiedadTableRecover";
import { PropiedadProfile } from "./pages/CRM/object-Propiedad/PropiedadProfile";
import { PropiedadProvider } from "./context/propiedadContext";

import { VehiculoTable } from "./pages/CRM/object-Vehiculo/VehiculoTable";
import { VehiculoTableRecover } from "./pages/CRM/object-Vehiculo/VehiculoTableRecover";
import { VehiculoProfile } from "./pages/CRM/object-Vehiculo/VehiculoProfile";
import { VehiculoProvider } from "./context/vehiculoContext";




import { RunProvider } from "./context/runContext";

function App() {
  return (
    <AuthProvider>
        <TaskProvider>

        <CustomerProvider>
        <RunProvider>
        <PropiedadProvider>
        <VehiculoProvider>
            
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

 



                       {/* Customers */}
                     <Route path="/personas" element={<CustomerTable />} />
                     <Route path="/personas/erased" element={<CustomerTableRecover />} />
                     <Route path="/persona/:id" element={<CustomerProfile />} />

                      {/* Propiedad */}
                      <Route path="/propiedades" element={<PropiedadTable />} />
                     <Route path="/propiedades/erased" element={<PropiedadTableRecover />} />
                     <Route path="/propiedad/:id" element={<PropiedadProfile />} />

                         {/* Vehiculo */}
                      <Route path="/vehiculos" element={<VehiculoTable />} />
                     <Route path="/vehiculos/erased" element={<VehiculoTableRecover />} />
                     <Route path="/vehiculo/:id" element={<VehiculoProfile />} />

  


                      <Route path="/admin" element={<Admin />} />

            


                    </Route>
                    {/* Protected Routes */}
                    
                  </Routes>
                </Suspense>
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
              </main>
            </BrowserRouter>
            </VehiculoProvider>
        </PropiedadProvider>
        </RunProvider>
        </CustomerProvider>

        </TaskProvider>
    </AuthProvider>
  );
}

export default App;
