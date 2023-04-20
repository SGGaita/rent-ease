import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './sidebar.scss'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RoofingIcon from '@mui/icons-material/Roofing';
import PeopleIcon from '@mui/icons-material/People';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { logo, logo_crop } from "../../constants/images";
import { useNavigate } from 'react-router-dom';
import CustomPrompt from "../confirmPrompt/ConfirmPrompt";
import { AuthContext } from "../../context/AuthContext";

export const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const handleDashboard = () => {
    navigate('dashboard');
  }

  // Define a function to set the "open" state to true, used for opening a modal or dialog box
  const handleOpen = () => {
    setOpen(true);
  };

  // Define a function to set the "open" state to false, used for closing a modal or dialog box
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
    navigate("/")
  }

  return (
    <div className={`sidebarOpen ${isOpen ? "" : "closed"}`}>
      <div className="top">
        <div className="toggle-button" onClick={toggleSidebar}>
          <KeyboardDoubleArrowLeftOutlinedIcon className="icon" />
          {isOpen ? (
            <img src={logo} alt="" />
          ) : (
            <img className="image_cropped" src={logo_crop} alt="" />
          )
          }
        </div>
      </div>

      <ul className="menu-items">
        <li className="dashboard" onClick={handleDashboard}>
          <DashboardOutlinedIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>
            Dashboard
          </span>
        </li>
        <li className="properties">
          <RoofingIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Properties</span>

          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="/properties/add-property">Add Property</Link></li>
              <li><Link to="/properties/view-properties">View Properties</Link></li>
            </ul>
          </div>
        </li>
        <li className="tenants">
          <PeopleIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Tenants</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="/tenants/add-tenant">Add Tenant</Link></li>
              <li><Link to="/tenants/view-tenants">View Tenants</Link></li>
            </ul>
          </div>
        </li>
        <li className="lease-agreements">
          <ReceiptOutlinedIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Lease Agreements</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="/lease-agreements/add-lease-agreement">Add Lease Agreement</Link></li>
              <li><Link to="/lease-agreements/view-lease-agreements">View Lease Agreements</Link></li>
            </ul>
          </div>
        </li>
        <li className="payments">
          <ReceiptLongIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Payments</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="payments/view-payments">View Payments</Link></li>
            </ul>
          </div>
        </li>
        <li className="maintenance-requests">
          <FeedbackIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Maintenance Requests</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="maintenance/view-requests">View Maintenance Requests</Link></li>
            </ul>
          </div>
        </li>
        <li className="reports">
          <InsightsOutlinedIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Reports & Analytics</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="reports/view-reports">View Reports</Link></li>
            </ul>
          </div>
        </li>
        <li className="account">
          <DisplaySettingsOutlinedIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Account</span>
          <div className={`sub-menu ${isOpen ? "" : "closed"}`}>
            <ul>
              <li><Link to="account/profile">Profile</Link></li>
              <li><Link to="account/change-password">Change Password</Link></li>
            </ul>
          </div>
        </li>
      </ul>


      <ul className="bottom">
        <li className="settings">
          <SettingsIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Settings</span>

        </li>
        <li className="logout" onClick={handleOpen}>
          <LogoutIcon className="icon" />
          <span className={`${isOpen ? "" : "closed"}`}>Logout</span>
          {/* Render a custom prompt component */}
          <CustomPrompt open={open}
            handleClose={handleClose}
            title="Confirm Logout"
            message="Are you sure you want to Logout?"
            confirmText="Logout"
            cancelText="Cancel"
            onConfirm={handleLogout} />
        </li>
      </ul>

    </div>
  );
}
