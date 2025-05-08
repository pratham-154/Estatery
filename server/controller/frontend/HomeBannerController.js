const bannerModel  =  require("../../models/apis/frontend/HomeBanner");

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
        "section":1,
        'title':1,
        'icon':1,
        "description":1,
        "sub_title":1,
        "feature_title":1,
        "feature_image":1,
        "feature_quote":1,
        "contact_title":1,
        "contact_description":1,
        "contact_quote":1 
    };

    let data = await bannerModel.getListing(req, select, where);
    //let data = await faqsModel.getAll(where, select);
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
    let resp = await bannerModel.get(id);    
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
    view,
};