const express = require('express');
const partnerRouter = express.Router();

const PartnerController = require('../../../controller/admin/PartnerController');

partnerRouter.get('/admin/partner',PartnerController.index);
partnerRouter.post('/admin/partner/add',PartnerController.add);
partnerRouter.put('/admin/partner/edit/:id',PartnerController.edit);
partnerRouter.get('/admin/partner/remove/:id',PartnerController.remove);
partnerRouter.get('/admin/partner/view/:id',PartnerController.view);

module.exports = partnerRouter;