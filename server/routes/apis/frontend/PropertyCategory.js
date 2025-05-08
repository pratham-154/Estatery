const express =  require('express');
const categoryRouter = express.Router();

const PropertyCategoryController = require('../../../controller/frontend/PropertyCategoryController');

categoryRouter.get('/category',PropertyCategoryController.index);
categoryRouter.get('/category/view/:id',PropertyCategoryController.view);

module.exports = categoryRouter;