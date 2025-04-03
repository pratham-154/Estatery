const contactModel  =  require("../../models/apis/frontend/ContactUs");
const { validatorMake } = require('../../helper/General')

const add = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "first_name": "required",
        }
    );
    if(!validatorRules.fails())
    {
        let resp = await contactModel.create(data);
        
        if(resp)
        {
            res.send({
                'status':true,
                'message':'Record has been saved successfully.',
                'data':resp
            })
        }
        else
        {
            res.send({
                'status':false,
                'message':'Something went wrong. Please try again later.',
                'data':[]
            })
        }
    }
    else
    {
        res.send({
            'status':false,
            'message':validatorRules.errors
        });
    }
};

module.exports = { 
    add,
};