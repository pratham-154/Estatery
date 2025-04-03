const express = require('express');
const contactRouter = express.Router();

const ContactController = require('../../../controller/admin/ContactUsController');

contactRouter.get('/admin/contact',ContactController.index);
contactRouter.post('/admin/contact/add',ContactController.add);
contactRouter.put('/admin/contact/edit/:id',ContactController.edit);
contactRouter.get('/admin/contact/remove/:id',ContactController.remove);
contactRouter.get('/admin/contact/view/:id',ContactController.view);

module.exports = contactRouter;