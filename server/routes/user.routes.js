const express = require('express');
const UserController = require('../controllers/user.controller');
const UserValidations = require('../validations/user.validations');
const validateRequest = require('../middlewares/validateRequest');
const requireUser = require('../middlewares/requireUser');

const router = express.Router();

router.get('/profile', requireUser(), UserController.getProfile);
router.put(
  '/profile',
  [requireUser(), validateRequest(UserValidations.updateProfile())],
  UserController.updateProfile
);
router.post('/report', requireUser(), UserController.reportUser);

module.exports = router;
