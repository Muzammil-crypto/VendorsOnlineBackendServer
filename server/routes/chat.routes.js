const express = require('express');
const ChatController = require('../controllers/chat.controller');
const ChatValidations = require('../validations/chat.validations');
const validateRequest = require('../middlewares/validateRequest');
const requireUser = require('../middlewares/requireUser');

const router = express.Router();

router.get('/', [requireUser()], ChatController.getChats);
router.get(
  '/:id',
  [requireUser(), validateRequest(ChatValidations.getChat())],
  ChatController.getChat
);
router.post(
  '/',
  [requireUser(), validateRequest(ChatValidations.createChat())],
  ChatController.createChat
);
router.post(
  '/:id/text',
  [requireUser(), validateRequest(ChatValidations.addTextMessage())],
  ChatController.addTextMessage
);
router.post(
  '/:id/reference',
  [requireUser(), validateRequest(ChatValidations.addReferenceMessage())],
  ChatController.addReferenceMessage
);

module.exports = router;
