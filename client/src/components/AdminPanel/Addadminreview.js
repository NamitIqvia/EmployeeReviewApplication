import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Typography } from '@material-ui/core';
import AdminReviewForm from './AdminReviewForm';
import Loader from '../Loader';

const Addadminreview = () => {
   const [employeeEmail, setEmployeeEmail] = useState([])
   const location = useLocation();


   const getEmployeeData = () => {
    let allEmployees = location.state.employeeData;
    console.log(allEmployees)
    setEmployeeEmail(allEmployees)
   }

   useEffect(() => {
    getEmployeeData()
   }, [])



    return (
        <div>
            <Typography variant="h5" gutterBottom>List of employees you can review as admin</Typography>
            <div>
              {
                  employeeEmail !== null && employeeEmail !== undefined  ?
                  employeeEmail.map(item => (
                      <div>
                        <AdminReviewForm item={item} reviewer="admin@gmail.com" />
                      </div>
                  ))
                  : <Loader />
              }
            </div>
            
        </div>
    )
}

export default Addadminreview
