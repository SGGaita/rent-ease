import { useContext, useState } from "react"
import { AuthProvider,AuthContext } from "./context/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from "./layout/Layout";

import {
  LoginPage,
  HomePage,
  AddProperties,
  ListProperties,
  AddTenants,
  ListTenants,
  AddLeaseAgreement,
  ViewLeaseAgreements,
  ViewPayments,
  ViewMaintenanceRequests,
  Reports,
  Profile,
  ChangePassword,
  SignUp
} from "./pages";


function App() {
  const { user } = useContext(AuthContext)

  const RequiredAuth = ({ children }) => {

    return user ? (children) : <Navigate to="dashboard" />

  };

  return (

    <div className="app">
      <ToastContainer />
      <div div className="app-wrapper">
        <Routes>
       
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginPage title="Login" />} />
            <Route path="signup" element={user ? <Navigate to="/dashboard" /> : <SignUp title="Sign up" />} />
            <Route path="dashboard"  element={<HomePage />} />
            <Route path="properties">
              <Route path="add-property"  element={<AddProperties title="Add new" />} />
              <Route path="view-properties" element={<ListProperties title="Properties" />} />
            </Route>
            <Route path="tenants">
              <Route path="add-tenant" element={<AddTenants title="Add new" />} />
              <Route path="view-tenants" element={<ListTenants title="Tenants" />} />
            </Route>
            <Route path="lease-agreements">
              <Route path="add-lease-agreement" element={<AddLeaseAgreement />} />
              <Route path="view-lease-agreements" element={<ViewLeaseAgreements />} />
            </Route>
            <Route path="payments">
              <Route path="view-payments" element={<ViewPayments />} />
            </Route>
            <Route path="maintenance" >
              <Route path="view-requests" element={<ViewMaintenanceRequests />} />
            </Route>
            <Route path="reports">
              <Route path="view-reports" element={<Reports />} />
            </Route>
            <Route path="account">
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
        
        </Routes>
      </div>
    </div>

  );
}

function RouterApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <App />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default RouterApp;
