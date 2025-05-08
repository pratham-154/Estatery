const {bloghead}   = require('../../index');
const {foreach, makeSlug} = require('../../../helper/General');

const getListing = async (req, select = {}, where = {}, joins = []) => {
    try
    {
        let {sort, direction, limit, offset, page} = req.query;
        
        direction = direction && direction == 'asc' ? -1 : 1;
        sortField = sort ? sort : 'created_at';
        limit     = limit ? parseInt(limit) : process.env.limit;
        offset    = page > 1 ? ((page-1)*limit) : 0;
        orderBy   = { [sortField]:direction }
    
        let listing = await bloghead.find(where, select, {skip:offset})
            .populate(joins)
            .sort(orderBy)
            .limit(limit);
    
        return listing;
    }
    catch(error)
    {
        return false;
    }
}

const getAll = async(where ={} ,select={} , joins =[] , orderBy= {'title':1} , limit = 10 )=>{
    try {
        let query =  bloghead.find(where, select);

        if (joins.length > 0){
            query =  query.populate(joins)
        }

        query =  query.sort(orderBy).limit(limit);
        let listing = await query.exec();
        return listing;
    } catch (error) {
        return false;
    }
}

const get = async (id, select = [], joins = []) => {
    try
    {   
        let record = bloghead.findById(id,select);
        
        if(joins)
        {
            record = record.populate(joins);
        }

        record = await record.exec();

        return record;
    }
    catch(error)
    {
        return false;
    }
}

const getRow = async (where,select = []) => {
    try
    {
        let record = await bloghead.findOne(where, select).exec();
        return record;
    }
    catch(error)
    {
        console.log(error)
        return false;
    }
}

const create = async (data) => {
    try
    {
        let row = new bloghead();
        row.created_at = new Date();
        foreach(data,(key,value)=>{
            row[key] = value
        })

        row.created_by = null;

        let resp = await row.save();
        
        if(resp)
        {
            if(resp.title)
            {
                let slug = makeSlug(resp.title);
                const count = await getCounts({'title':resp.title});
                if(count > 1)
                {
                    slug = slug+'-'+(count);
                }
                resp.slug = slug;
                resp.save();
            }
            return resp;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        return false;
    }    
}

const modify = async (id, data) => {
    try
    {
        data.updated_at = new Date();
        let resp = await bloghead.updateOne(
            {
                "_id":id
            },
            data
        ).exec();

        if(resp)
        {
            let updated = await get(id);
            return updated;
        }
        else
        {
            return null;
        }
    }
    catch(error)
    {
        return false;
    }
}

const modifyAll = async (ids, data) => {
    try
    {
        let resp = await bloghead.updateMany(
            {
                '_id':{
                    $in:ids
                }
            },
            data
        );

        if(resp)
        {
            return resp;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        return false;
    }
}

const remove = async (id) => {
    try
    {
        let getRecord = await get(id);
        if(getRecord)
        {
            let record = await bloghead.deleteOne({
                '_id':id
            }).exec();

            return record;
        }
        else
        {
            return false;
        }
    }
    catch(error)
    {
        return false;
    }
}

const removeAll = async (ids) => {
    try
    {
        let record = await bloghead.deleteMany(
            {
                '_id':{
                    $in:ids
                }
            }
        );
        return record;
    }
    catch(error)
    {
        return error;
    }
}

const getCounts = async (where = {}) => {
    try
    {
        let record = await bloghead.countDocuments(where).exec();
        return record;
    }
    catch(error)
    {
        return false;
    }
}

module.exports = { 
    getListing, 
    getAll, 
    get,
    getRow,
    create,
    modify,
    modifyAll,
    remove,
    removeAll,
    getCounts
};