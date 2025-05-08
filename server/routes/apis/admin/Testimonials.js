const express =  require('express');
const faqsRouter = express.Router();

const FaqsController = require('../../../controller/admin/TestimonialController');

faqsRouter.get('/admin/faq',FaqsController.index);
faqsRouter.post('/admin/faq/add',FaqsController.add);
faqsRouter.put('/admin/faq/edit/:id',FaqsController.edit);
faqsRouter.get('/admin/faq/remove/:id',FaqsController.remove);
faqsRouter.get('/admin/faq/view/:id',FaqsController.view);

module.exports = faqsRouter;