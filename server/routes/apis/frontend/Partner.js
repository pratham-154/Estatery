const express = require('express');
const partnerRouter = express.Router();

const PartnerController = require('../../../controller/frontend/PartnerController');

partnerRouter.get('/partner',PartnerController.index);
partnerRouter.get('/partner/view/:id',PartnerController.view);

module.exports = partnerRouter;