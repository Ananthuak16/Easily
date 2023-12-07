// index.js


import express from 'express';
import JobsController from './src/controllers/job.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import Mailer from './src/controllers/emailService.js';
import multer from 'multer';

const app = express();

app.use(express.static('public'));
app.use(cookieParser());


app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);



const jobsController = new JobsController();
const usersController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

// Add this route to render the index.ejs view
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', usersController.getRegister);
app.get('/login', usersController.getLogin);
app.post('/login', usersController.postLogin);
app.get('/logout', usersController.logout);
app.post('/register', usersController.postRegister);

// New job routes
app.get('/jobs', setLastVisit,  jobsController.getJobs);
app.get('/newJob',auth, jobsController.getAddJob);

app.post('/jobs', setLastVisit,auth, validationMiddleware, jobsController.postAddJob);




// // Route for handling the update-job form submission

app.get('/job/:id',jobsController.getJobDetails);


app.get('/update-job/:id',setLastVisit, jobsController.getUpdateJobView);

// Route for handling the update-job form submission
app.post('/update-job/:id',setLastVisit, jobsController.postUpdateJob);








// Add this route for deleting a job

app.get('/delete-job/:id',auth, jobsController.deleteJob.bind(jobsController));



// index.js or your route definition file

app.post('/submitApplication', async (req, res) => {
  // Retrieve data from the form submission
  const { applicantName, applicantEmail, applicantContact, resume } = req.body;

  // Validate the data (add more validation as needed)
  if (!applicantName || !applicantEmail || !applicantContact || !resume) {
    return res.status(400).send('Incomplete data. Please fill in all required fields.');
  }

 
  const jobApplication = {
    applicantName,
    applicantEmail,
    applicantContact,
    resume,
    // Add more fields as needed
  };

  
  // Save the application to your data store
  jobApplications.push(jobApplication);

  // Send an email to the applicant
  try {
    // Assuming Mailer is a function that sends an email
    await Mailer(applicantEmail, applicantName);
    console.log(`Email sent to ${applicantEmail} successfully.`);
  } catch (error) {
    console.error('Error sending email:', error);
    // You may choose to handle the error in a way that makes sense for your application
  }

  // Optionally, you can send a confirmation response
  
  res.render('success');
});

// Sample array to store job applications (replace this with your database logic)
const jobApplications = [];

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
