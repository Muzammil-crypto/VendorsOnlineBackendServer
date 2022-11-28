const express = require('express');
const JobController = require('../controllers/job.controller');
const JobValidations = require('../validations/job.validations');
const validateRequest = require('../middlewares/validateRequest');
const requireUser = require('../middlewares/requireUser');

const router = express.Router();

router.get(
  '/',
  validateRequest(JobValidations.getAllJobs()),
  JobController.getAllJobs
);
router.get(
  '/:id',
  validateRequest(JobValidations.getJobById()),
  JobController.getJobById
);
router.post(
  '/',
  [validateRequest(JobValidations.createJob()), requireUser()],

  JobController.createJob
);
router.put(
  '/:id',
  [validateRequest(JobValidations.updateJob()), requireUser()],
  JobController.updateJob
);
router.delete(
  '/:id',
  [validateRequest(JobValidations.deleteJob()), requireUser()],
  JobController.deleteJob
);
router.post(
  '/:id/review',
  [validateRequest(JobValidations.reviewJob()), requireUser()],
  JobController.reviewJob
);

module.exports = router;
