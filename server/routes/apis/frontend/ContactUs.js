const express = require('express');
const contactRouter = express.Router();

const ContactController = require('../../../controller/frontend/ContactUsController');

contactRouter.post('/contact/add',ContactController.add);

module.exports = contactRouter;