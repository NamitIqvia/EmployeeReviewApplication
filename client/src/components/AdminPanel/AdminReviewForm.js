import React, {useState, useRef} from 'react';
import {Paper, TextField, Button, Typography, TextareaAutosize} from '@material-ui/core';

const AdminReviewForm = ({item, reviewer}) => {

    const dataRef = useRef(null)
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [employeeReview, setEmployeeReview] = useState("")
    const paperStyle = {padding: "20px", height:"280px", width:"50vw", margin:"20px auto", backgroundColor: '#95dea8'}
    const typographyStyle={textAlign:'center'}
    const textareaStyle={width:'80%', marginBottom:'20px'}
    const alertStyle={textAlign:'center'}


    const updateEmployeeReview = (event) => {
        setEmployeeReview(event.target.value)
        setShowSubmitAlert(false)
    }

    const submitReview = async (event) => {
        event.preventDefault();
        console.log("current div val")
        console.log(reviewer)
        console.log(dataRef.current.textContent)
        let reviewUpdateData = {
            reviewedemployee: dataRef.current.textContent.toString(),
            reviewer: reviewer.toString(),
            review: employeeReview.toString()
        }

        let submitEmployeeReview = await fetch("http://localhost:5000/users/submitreview", {
            method:'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reviewUpdateData)
        })

        if(submitEmployeeReview.ok){
            setShowSubmitAlert(true)
            console.log(`Employee review submitted successfully`)
            setEmployeeReview("")
        }
        else{
            console.log(`Error submitting review ${submitEmployeeReview.status}`)
        }
 
    }


    return (
           
           <Paper elevation={10} style={paperStyle}>
              {showSubmitAlert ? (<div style={alertStyle}>Form Submitted successfully</div>) : null}
              <Typography variant="h6" style={typographyStyle} ref={dataRef} gutterBottom >{item.email}</Typography>
              <TextareaAutosize aria-label="minimum height" value={employeeReview} onChange={(e) => updateEmployeeReview(e)} style={textareaStyle} rowsMin={10} placeholder="Please enter the review here...." />
              <Button onClick={(e) => submitReview(e)} variant="contained" color="primary">Submit Review</Button>
            </Paper>
    )
}

export default AdminReviewForm
