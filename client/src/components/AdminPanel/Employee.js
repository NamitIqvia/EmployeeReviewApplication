import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

const Employee = ({data, employeeData, deleteSelectedEmployee}) => {

   // const [employees, setEmployees] = useState([]);
    


    const cardStyle= {backgroundColor: '#95dea8'}
    const typographyStyle={textAlign:'left'}
    const linkbuttonStyle={marginBottom:'20px'}

    const removeEmployee = async (event) => {
          event.preventDefault();

          let deleteEmployee = await fetch(`http://localhost:5000/users/delete/${data.email.toString()}`, {
              method:'DELETE',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
          })

        if(deleteEmployee.ok){
            console.log(`Employee deleted successfully`)
            deleteSelectedEmployee()
        }

        else{
            console.log(`Error deleting employee ${deleteEmployee.status}`)
        }
    }
    

    return (
        <div>
            <Card style={cardStyle}>
               <CardContent>
                  <div>

                      <Typography variant="h6" style={typographyStyle}>
                          Name : {data.name}
                      </Typography>
                      <Typography variant="h6" style={typographyStyle} gutterBottom >
                          Email : {data.email}
                      </Typography>

                  </div>
                  <Link to={{ pathname:"/assigrev", state:{empDetails: employeeData, currentEmployee: data }}}><Button size="small" variant="contained" color="primary" style={linkbuttonStyle}>Assign Task To Review</Button></Link>
                  <Button onClick={(e) => removeEmployee(e)} size="small" variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete Employee</Button>
               </CardContent>
            </Card>
        </div>
    )
}

export default Employee
