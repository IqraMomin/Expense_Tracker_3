import React from 'react'
import { Nav } from 'react-bootstrap'
import {House,Wallet, Folder,BarChart, BoxArrowRight } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';

function Sidebar() {
    const dispatch = useDispatch();

    const logoutHandler=()=>{
        dispatch(authActions.logout());
    }
    return (
        <div className="sidebar-container">
            <h2 className='sidebar-title'>Expense Tracker</h2>
            <Nav className='flex-column mt-4' style={{gap:"1rem"}}>
                <NavLink to="/welcome" className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}>
                    <House/>Dashboard
                    </NavLink>
                <NavLink to="/expensepage" className='sidebar-link'><Wallet/>Expenses</NavLink>
                <NavLink to="/authpage" onClick={logoutHandler} className='sidebar-link'><BoxArrowRight/>Logout</NavLink>
                
                
                
            </Nav>
        </div>
    )
}

export default Sidebar
