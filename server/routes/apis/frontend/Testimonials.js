const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/frontend/TestimonialController');

faqsRouter.get('/faq',FaqsController.index);
faqsRouter.get('/faq/view/:id',FaqsController.view);

module.exports = faqsRouter;