const express = require('express');
const AuthController = require('../controllers/auth.controller');
const AuthValidations = require('../validations/auth.validations');
const validateRequest = require('../middlewares/validateRequest');
const requireUser = require('../middlewares/requireUser');

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.login()),
  AuthController.login
);
router.post(
  '/register',
  validateRequest(AuthValidations.register()),
  AuthController.register
);
router.post('/logout', requireUser(), AuthController.logout);
router.get('/currentUser', requireUser(), AuthController.getCurrentUser);

module.exports = router;
