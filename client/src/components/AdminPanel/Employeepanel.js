import React, { useState} from 'react';
import clsx from 'clsx';
import { useLocation } from "react-router-dom";
import {Grid, Paper, Avatar, TextField, Button, Typography} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 200,
      marginBottom:'30px'
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const Employeepanel = () => {

    const location = useLocation();
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (event) => {
        setPersonName(event.target.value);
        setShowAlert(false)
      };
    
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        setPersonName(value);
      };

    const typographyStyle={textAlign:'left', fontWeight:'bolder', marginLeft:'10px'}
    const subHeadingStyle={textAlign:'left', fontWeight:'bolder'}
    const paperStyle = {padding: "20px", width:"40vw", margin:"20px auto", minHeight:'50vh', position:"relative"}
    const buttonStyle ={position:"absolute", bottom:"0px", right:"0px"}
    const upperSection = {backgroundColor: '#95dea8', padding:'5px', marginBottom:"10px"}
    const selectedEmpList ={display: 'flex', flexWrap:'wrap'}
    const employeeStyle ={marginRight:'10px', marginBottom:'10px', padding:'4px', border:'0.2px solid #95dea8', borderRadius:'10px', backgroundColor:'#ccffd9'}
    let allEmployees = location.state.empDetails;
    let nameIndex = allEmployees.findIndex((item) => item.name === location.state.currentEmployee.name)
    //allEmployees.splice(nameIndex, 1)
    console.log(allEmployees)
    let emp = []
    allEmployees.forEach(item => {
        if(item.email !== location.state.currentEmployee.email){
           emp.push(item.email.toString())
        }
    })
    console.log(emp)
    
    const updateReviews = async (event) => {
         event.preventDefault();
         let reviewUpdateData = {
             email: location.state.currentEmployee.email.toString(),
             employeenames: personName
         }

         let reviewUpdate = await fetch("http://localhost:5000/users/assignreviews", {
             method:'PUT',
             headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(reviewUpdateData)
         })
         if(reviewUpdate.ok){
            setShowAlert(true)
            console.log("Success ")
 
        }
        else{
            console.log("Error "+ reviewUpdate.status)
        }
    }
    

    /*const names2 = [
        "bijoy@gmail.com",
        "admin@gmail.com",
        "Jasprit@gmail.com",
        "Rahul@gmail.com",
       "shubhi@gmail.com",
    ]*/


    return (
        <React.Fragment>
        <h2>Assign Reviews</h2>
        {showAlert ? (<div>Form Submitted successfully</div>) : null}
        <Grid>
           <Paper elevation={10} style={paperStyle}>
                <div style={upperSection}>
                   <Typography variant="h6" style={typographyStyle}> Name : {location.state.currentEmployee.name}</Typography>
                   <Typography variant="h6" style={typographyStyle} gutterBottom >Email : {location.state.currentEmployee.email}</Typography>
                </div>
                <Typography variant="h6" style={subHeadingStyle}>Please select from the below list of employees</Typography>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Select Employees</InputLabel>
                <Select
                   labelId="demo-mutiple-chip-label"
                   id="demo-mutiple-chip"
                   multiple
                   value={personName}
                   onChange={handleChange}
                   input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                 <div className={classes.chips}>
                     {selected.map((value) => (
                         <Chip key={value} label={value} className={classes.chip} />
                  ))}
                 </div>
                )}
                 MenuProps={MenuProps}
                >
                {emp.map((name) => (
                 <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                </MenuItem>
                ))}
            </Select>
         </FormControl>
               
                <Typography variant="h6" style={subHeadingStyle}>{location.state.currentEmployee.name} will review the below employees</Typography>
                <div style={selectedEmpList}>
                {
                     personName.map((item) => (
                         <span style={employeeStyle}>{item}</span>
                     ))
                }
                </div>
            <Button onClick={(e) => updateReviews(e)} style={buttonStyle} variant="contained" color="primary">Assign</Button>
           </Paper>
           
        </Grid>
        </React.Fragment>
    )
}

export default Employeepanel
