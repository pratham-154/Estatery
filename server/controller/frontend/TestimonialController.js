const faqsModel  =  require("../../models/apis/frontend/Testimonials");

const index = async (req, res) => {
    let { search, created_on, status, created_by } = req.query
    let where = {'deleted_at': {$eq: null}};
    
    if(search)
    {
        search = new RegExp(search,'i')
        where = {
            ...where,
            $or:[
                {
                    "title":search
                },
                {
                    "description":search
                },
                {
                    'role':search
                }
            ]
        }
    }

    if(created_on && Array.isArray(created_on))
    {
        let dateFilter = {};

        if(created_on[0] && created_on[0] !== '')
        {
            dateFilter.$gte = new Date(created_on[0]);
        }

        if(created_on[1] && created_on[1] !== '')
        {
            dateFilter.$lte = new Date(created_on[1]);
        }

        if(Object.keys(dateFilter).length > 0)
        {
            where.created_at = dateFilter;
        }
    }

    if(created_by && Array.isArray(created_by) && created_by.length > 0)
    {
        where = {
            ...where,
            'created_by': {
                $in: created_by
            }
        };
    }

    if(status)
    {
        where.status = status;
    }

    let select = {
        '_id':1,
        'title':1,
        'description':1,
        'role':1,
        "avatar":1
    };

    let data = await faqsModel.getListing(req, select, where);
    if(data)
    {
        res.send({
            'status':true,
            'message':'Data Fetch Successfully',
            'data':data
        })
    }
    else
    {
        res.send({
            'status':true,
            'message':'No data found',
            'data':[]
        })
    }
};

const view = async (req, res) => {
    let {id} = req.params;
    
    let resp = await faqsModel.get(id);
    
    if(resp)
    {
        res.send({
            'status':true,
            'message':'Record has been fetched successfully.',
            'data':resp,
        })
    }
    else
    {
        res.send({
            'status':true,
            'message':'Not able to find any record. Please try again later.',
            'data':[]
        })
    }
};

module.exports = { 
    index, 
    view
};