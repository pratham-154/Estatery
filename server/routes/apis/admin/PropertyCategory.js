const express =  require('express');
const categoryRouter = express.Router();

const PropertyCategoryController = require('../../../controller/admin/PropertyCategoryController');

categoryRouter.get('/admin/category',PropertyCategoryController.index);
categoryRouter.post('/admin/category/add',PropertyCategoryController.add);
categoryRouter.put('/admin/category/edit/:id',PropertyCategoryController.edit);
categoryRouter.get('/admin/category/remove/:id',PropertyCategoryController.remove);
categoryRouter.get('/admin/category/view/:id',PropertyCategoryController.view);

module.exports = categoryRouter;