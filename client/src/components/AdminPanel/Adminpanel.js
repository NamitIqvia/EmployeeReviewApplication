import React, {useState, useEffect, useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Employee from './Employee';
import {Button, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const Adminpanel = () => {

    const [employeeData, setEmployeeData] = useState([])
    const [counter, setCounter] = useState(0)
    
    const buttonStyle = {marginBottom:'20px'}
    const buttonStyleSubmit ={marginRight:'30px', marginBottom:'20px'}


    const deleteEmployee = () => {
        setCounter(counter + 1)
    }

    const compareResults = (obtainedData, currentState) => {
           let returnValue = "same"
           if(obtainedData.length !== currentState.length){
                returnValue = "updated"
                console.log("Value upadated in length")
           }
           else{
               for(let i=0;i<obtainedData.length;i++){
                   if(JSON.stringify(obtainedData[i]) !== JSON.stringify(currentState[i])){
                           returnValue = "updated"
                           console.log("Value upadated in property")
                           break;
                   }
               }
           }

           return returnValue
    }

    const getEmployees = async () => {
        let fetchListOfUsers = await fetch("http://localhost:5000/users/loademployees")
        if(fetchListOfUsers.ok){
            let usersArray = await fetchListOfUsers.json()
            console.log("Users list")
            console.log(usersArray.currentemployees)
            let genuineUsers = usersArray.currentemployees.filter(item => item.email.toString() !== "admin@gmail.com")
            /*let comparisonResult = compareResults(genuineUsers, employeeData)
            console.log("comp result "+comparisonResult)
            if(comparisonResult == "updated"){
                setCounter(counter + 1)
            }*/
            setEmployeeData(genuineUsers)
        }
        else{
            console.log(`Error fetching employee data ${fetchListOfUsers.status}`)
        }
    }

    useEffect(() => {
        getEmployees()
    }, [counter])


    return (
        <div>
            <h1>List of Employees</h1>
            <Link to={{ pathname:"/addadminreview", state:{employeeData: employeeData} }}><Button type="submit"  variant="contained" color="primary" style={buttonStyleSubmit}>Add Reviews as Admin</Button></Link>
            <Link to="/allemployeesreview"><Button type="submit"  variant="contained" color="primary" style={buttonStyle}>All Reviews</Button></Link>
                {employeeData !== null && employeeData !== undefined ? (
                <Grid container justify="left" spacing = {4}>
                 
                   { employeeData.map((item) => (
                        <Grid item xs={6} sm={6} md={4} lg={3}>
                           <Employee data={item} employeeData={employeeData} deleteSelectedEmployee={deleteEmployee} />
                        </Grid>
                    )) }
                </Grid>
                ) : <Loader />}
        </div>
    )
}

export default Adminpanel
