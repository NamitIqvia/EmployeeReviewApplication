import React, { useState } from 'react';
import {Grid, Paper, Avatar, TextField, Button, Typography} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Link, useHistory } from 'react-router-dom';



const Signup = ({addUsers}) => {

    let history = useHistory();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassward, setUserPassword] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);


    const paperStyle = {padding: "20px",height:"70vh", width:"280px", margin:"20px auto"}
    const headerStyle = {margin:0}
    const avatarStyle = {backgroundColor:"#ad7feb"}
    const btnStyle = {margin:"10px 0"}
    const radioButtonStyle = {marginTop:"20px"}
    const navstyle = {textDecoration:"none"}
    const errorContainer = {backgroundColor: "#fc0330", color:"white", fontWeight:"bold", textAlign:"center", marginTop:"60px", paddingTop:"10px", paddingBottom:"10px"}

    const preventSubmit = async (e) => {
       e.preventDefault();
       let formData = {
           name:userName.toString(),
           email:userEmail.toString(),
           password:userPassward.toString()
       }
       
       let signupResponse = await fetch("http://localhost:5000/users/signup", {
           method:'POST',
           headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
           body: JSON.stringify(formData)
       })
       if(signupResponse.ok){
           let signUpAlert = await signupResponse.json()
           setErrorFlag(false);
           console.log("Success ")
           history.push('/login')

       }
       else{
           console.log("Error "+ signupResponse.status)
           setErrorFlag(true);
       }
    }


    return (
       <Grid>
           <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon /> </Avatar>
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption" gutterBottom>Please Fill the form below to register</Typography>
            </Grid>
            <form onSubmit={(e) => preventSubmit(e)}>
               <TextField required={true} value={userName} label="Name" id="standard-name" onChange={(e) =>{setUserName(e.target.value)}} fullWidth />
               <TextField required={true} value={userEmail} label="Email" id="standard-email" onChange={(e) =>{setUserEmail(e.target.value)}} fullWidth />
               <TextField required={true} value={userPassward} label="Password" id="standard-password" onChange={(e) =>{setUserPassword(e.target.value)}} type="password" fullWidth />
               <Button type="submit" variant="contained" color="primary" style={btnStyle} fullWidth>Sign up</Button>
            </form>
            <Typography>Already a user ? <Link to="/login" style={navstyle}>Sign In</Link></Typography>
            {errorFlag == true ?<div style={errorContainer}>The User Already Exists!!</div> : null}
           </Paper>
       </Grid>
    )
}

export default Signup;