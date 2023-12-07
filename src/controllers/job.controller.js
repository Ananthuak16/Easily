

// src\controllers\job.controller.js

// jobs.controller.js

import JobModel from '../models/job.model.js';
import Mailer from './emailService.js';
import validationMiddleware from '../middlewares/validation.middleware.js';

class JobsController {
  getJobs(req, res, next) {
    const jobs = JobModel.getAll();
    res.render('jobs', {
      jobs,
      userEmail: req.session.userEmail,
      lastVisit: req.session.lastVisit,
    });
  }

  getAddJob(req, res, next) {
    res.render('newJob', {
      layout: 'layout',
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  postAddJob(req, res, next) {
    console.log('Handling postAddJob');
    console.log('New Job Data:', req.body);

    const { companyName, category, designation, location, salary, skillsRequired, applyBy } = req.body;
    const newJob = JobModel.addJob(companyName, category, designation, location, salary, skillsRequired, applyBy);
    const jobs = JobModel.getAll();

    // Log the newly added job data
    console.log('Newly Added Job:', newJob);

    // Send email to the applicant
    Mailer(req.body.applicantEmail, req.body.applicantName);

    // Render the jobs page with updated data
    res.render('jobs', {
      jobs,
      userEmail: req.session.userEmail,
    });

    console.log('Finished handling postAddJob');
  }

  getUpdateJobView(req, res, next) {
    const id = req.params.id;
    const jobFound = JobModel.getById(id);
    if (jobFound) {
      res.render('update-job', {
        job: jobFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(404).send('Job not found');
    }
  }

  postUpdateJob(req, res) {
    const id = req.params.id; // Retrieve job ID from request parameters
    const { companyName, category, designation, location, salary, skillsRequired, applyBy } = req.body;
  
    // Validate the data
    if (!id || !companyName || !category || !designation || !location || !salary || !skillsRequired || !applyBy) {
      return res.status(400).send('Invalid or incomplete data. Please provide valid values for all fields.');
    }
  
    // Update the job using the JobModel
    const updatedJob = JobModel.updateJob(id, companyName, category, designation, location, salary, skillsRequired, applyBy);
  
    if (updatedJob) {
      const jobs = JobModel.getAll();
      res.render('jobs', { jobs });
    } else {
      res.status(404).send('Job not found');
    }
  }
  

  deleteJob(req, res) {
    const id = req.params.id;
    const jobFound = JobModel.getById(id);

    if (!jobFound) {
      return res.status(404).send('Job not found');
    }

    // Delete the job
    JobModel.deleteJob(id);

    // After deletion, render back to the jobs page
    const jobs = JobModel.getAll();
    res.render('jobs', { jobs });
  }




  getJobDetails(req, res, next) {
    const id = req.params.id;
    console.log('Job ID:', id);
   

    const job = JobModel.getById(id);

    if (job) {
      res.render('jobDetails', { job ,
        userEmail: req.session.userEmail, });
      
    } else {
      res.status(404).send('Job not found');
    }
  }
  

}

export default JobsController;
