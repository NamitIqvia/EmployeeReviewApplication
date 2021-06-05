import React, {useState, useEffect, useRef} from 'react';
import {Paper, TextField, Button, Typography, TextareaAutosize} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Loader from '../Loader';

const EnterReview = () => {

  const dataRef = useRef(null)
  const [activeUserData, setActiveUserData] = useState({})
  const [employeeReview, setEmployeeReview] = useState([{email:'', review:''}])
  const paperStyle = {padding: "20px", height:"280px", width:"50vw", margin:"20px auto", backgroundColor: '#95dea8'}
  const typographyStyle={textAlign:'center'}
  const textareaStyle={width:'80%', marginBottom:'20px'}
  const buttonStyle ={align:'left'} 

   const reviewTask = async () => {
        let employeeNameObject = JSON.parse(localStorage.getItem('activeuser'))
        let activeEmployeeIndentifier = employeeNameObject.email.toString()
        let ativeEmployee = await fetch(`http://localhost:5000/users/activeemployee/${activeEmployeeIndentifier}`)
        if(ativeEmployee.ok){
          let activeEmployeeData = await ativeEmployee.json()
          console.log("the active employee is")
          console.log(activeEmployeeData.activeemployee.toreview)
          setActiveUserData(activeEmployeeData.activeemployee)
        }
        else{
            console.log(`Error fetching active employee data ${ativeEmployee.status}`)
        }
   }

   const submitReview = (event) => {
       event.preventDefault();
       console.log("current div val")
       console.log(dataRef.current.textContent)

   }


   useEffect(() => {
    reviewTask()
   }, [])

    return (
        <div>
          <Typography variant="h5" gutterBottom>Hello {activeUserData.name}, you have been assigned the task to review the following members of your team</Typography>
          <Link to="/activeemployeereview"><Button type="submit"  variant="contained" color="primary" style={buttonStyle}>Reviews I Got !!</Button></Link>
          <div>
              {
                  activeUserData.toreview !== null && activeUserData.toreview !== undefined  ?
                  activeUserData.toreview.map(item => (
                      <div>
                        <ReviewForm item={item} reviewer={activeUserData.email} />
                      </div>
                  ))
                  : <Loader />
              }
          </div>
        </div>
    )
}

export default EnterReview
