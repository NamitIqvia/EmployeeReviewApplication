import React, {useEffect, useState} from 'react';
import { Typography } from '@material-ui/core';
import Loader from '../Loader';

const ActiveEmployeeReviews = () => {
    
    const [activeUserData, setActiveUserData] = useState({})

    const reviewContainer = {textAlign:'left', backgroundColor:"#95dea8", marginBottom:'20px', padding:'4px'}

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

   useEffect(() => {
    reviewTask()
}, [])




    return (
        <div>
            <Typography variant="h3" gutterBottom>Hello {activeUserData.name}, please find the reviews you got from your colleagues below</Typography>
          <div>
              {
                  activeUserData.reviewedby !== null && activeUserData.reviewedby !== undefined  ?
                  activeUserData.reviewedby.map(item => (
                      <div style={reviewContainer}>
                         <Typography variant="h5">{item.review}</Typography>
                      </div>
                  ))
                  : <Loader />
              }
          </div> 
        </div>
    )
}

export default ActiveEmployeeReviews
