import React, {useState, useEffect} from 'react';
import {Typography, Paper} from '@material-ui/core';
import Loader from '../Loader';

const AllEmployeesReviews = () => {



    const[employeeData, setEmployeeData] = useState([])
    const typographyStyle={textAlign:'left'}
    const paperStyle = {padding: "20px", minHeight:"280px", width:"50vw", margin:"20px auto", backgroundColor: '#95dea8'}
    const review = {textAlign: 'left', fontWeight:'bold'}
    const reviewContainer= {border: "2px solid #7c7ce6", padding:'2px', marginBottom:'10px'}

    const getEmployees = async () => {
        let fetchListOfUsers = await fetch("http://localhost:5000/users/loademployees")
        if(fetchListOfUsers.ok){
            let usersArray = await fetchListOfUsers.json()
            console.log("Users list")
            console.log(usersArray.currentemployees)
            let genuineUsers = usersArray.currentemployees.filter(item => item.email.toString() !== "admin@gmail.com")
            setEmployeeData(genuineUsers)
        }
        else{
            console.log(`Error fetching employee data ${fetchListOfUsers.status}`)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [])



    return (
        <div>
            <Typography variant="h3">Please find the list of reviews for all the employees</Typography>
            {
                employeeData !== null && employeeData !== undefined ?
                employeeData.map(item => (
                    <Paper elevation={10} style={paperStyle}>
                      <Typography variant="h5" style={typographyStyle}>
                          Name : {item.name}
                      </Typography>
                      <Typography variant="h5" style={typographyStyle} gutterBottom >
                          Email : {item.email}
                      </Typography>
                      {item.reviewedby.length !== 0 ?
                          item.reviewedby.map(reviewList => (
                              <div style={reviewContainer}>
                                <p style={review}>{reviewList.review}</p>
                                <small>By {reviewList.name}</small>
                              </div>

                          )) : <p>No reviews for {item.name}</p>
                      }
                    </Paper>
                )) : <Loader />
            }
        </div>
    )
}

export default AllEmployeesReviews
