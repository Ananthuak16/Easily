
// src\models\job.model.js

class JobModel {
  constructor(id, companyName, category, designation, location, salary, skillsRequired, applyBy) {
    this.id = id;
    this.companyName = companyName;
    this.category = category;
    this.designation = designation;
    this.location = location;
    this.salary = salary;
    this.skillsRequired = skillsRequired;
    this.applyBy = applyBy;
  }

  static getAll() {
    return jobs;
  }

  static getById(id) {
    return jobs.find((job) => job.id==id);
  }

  static addJob(companyName, category, designation, location, salary, skillsRequired, applyBy) {
    const newJob = new JobModel(jobs.length + 1, companyName, category, designation, location, salary, skillsRequired, applyBy);
    jobs.push(newJob);
    return newJob;
  }

  


static updateJob(id, companyName, category, designation, location, salary, skillsRequired, applyBy) {
  const jobToUpdate = jobs.find((job) => job.id == id);

  if (jobToUpdate) {
    jobToUpdate.companyName = companyName;
    jobToUpdate.category = category;
    jobToUpdate.designation = designation;
    jobToUpdate.location = location;
    jobToUpdate.salary = salary;
    
    // Ensure that skillsRequired is always an array
    jobToUpdate.skillsRequired = Array.isArray(skillsRequired) ? skillsRequired : [skillsRequired];
    
    jobToUpdate.applyBy = applyBy;

    return jobToUpdate;
  } else {
    return null; // Job not found
  }
}


static deleteJob(id) {
  const index = jobs.findIndex((job) => job.id == id);

  if (index !== -1) {
    jobs.splice(index, 1);
  }
}

}

// Sample jobs data
const jobs = [
  new JobModel(1, 'Coding Ninjas', 'Tech', 'SDE', 'Gurgaon HR IND Remote', '14-20lpa', ['REACT', 'NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], '2023-12-31'),
  new JobModel(2, 'Go Digit', 'Tech', 'Angular Developer', 'Pune IND On-Site', '6-10lpa', ['Angular', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], '2023-12-30'),
  new JobModel(3, 'Juspay', 'Tech', 'SDE', 'Bangalore IND', '20-26lpa', ['REACT', 'NodeJs', 'JS', 'SQL', 'MongoDB', 'Express', 'AWS'], '2023-12-29'),
];

export default JobModel;
