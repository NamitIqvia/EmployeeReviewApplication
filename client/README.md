## Below are the list of steps to start the appliaction

``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

# Steps to work on the appliaction are written below
 1 - First of all setup the application using the steps defined 
 
 2 - Once both the backend server and the frontend server start in the localhost:5000 and localhost:3000 respectively, you will first see the signup page

 3- In the signup page enter the name, email and password of the user and press the signup button(I have already created some users so you can skip this step and click on the signin link provided on the signup page below the button)

 4- Once the user is registered you will reach the signin page, there a two types of login possible in signin page a user login and an admin login. For the user login use the credentials you created on the signup page and for the admin login use the foloowing credentials
 email - admin@gmail.com
 password - 1234

 5- Once you click signin from admin login you will be navigated to a page which consistes of all the current employees, there you can assign the employees with tasks to review other employees or you can see all the reviews all employees got and even assign reviews to different employees

 6- If you login using the user login created by you then you will be navigated to the employee tasks page where as an employee you can assign reviews to other employees as a task assigned by the admin and you can also see the reviews you got from other employees and the admin.

 other existing users created by me
 email - namit2701@gmail
 password - 1234

 email - Rahul@gmail.com
 password - 1234

 very important admin credentials
 
 email - admin@gmail.com
 password - 1234
