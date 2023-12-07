
// validation.middleware.js

import { body, param, validationResult } from 'express-validator';

const validateRequest = async (req, res, next) => {
  // 1. Setup rules for validation.
  const rules = [
    // ... other rules

    

    body('companyName')
      .notEmpty()
      .withMessage('Company Name is required'),
      body('salary')
      .notEmpty()
      .withMessage('Salary is required')
      .isString()
      .withMessage('Salary should be a string'),
    ,
    body('applyBy')
      .isISO8601()
      .toDate()
      .withMessage('Invalid date format for Apply By field'),
    // Add other validation rules for the remaining fields.
  ];

  // 2. Run those rules.
  try {
    await Promise.all(rules.map((rule) => rule.run(req)));
  } catch (error) {
    console.error('Validation Error:', error);
    return res.status(500).send('Internal Server Error');
  }

  // 3. Check if there are any errors after running the rules.
  const validationErrors = validationResult(req);

  // 4. If errors, return the error message.
  if (!validationErrors.isEmpty()) {
    console.log('Validation Errors:', validationErrors.array());
    return res.render('update-job', {
      errorMessage: validationErrors.array()[0].msg,
      job: req.body, // Pass the existing job data back to the form for better user experience
      userEmail: req.session.userEmail,
    });
  }

  next();
};

export default validateRequest;

