const {about}   = require('../../index');

const getListing = async (req, select = {}, where = {}, joins = []) => {
    try
    {
        let {sort, direction, limit, offset, page} = req.query;
        
        direction = direction && direction == 'asc' ? -1 : 1;
        sortField = sort ? sort : 'created_at';
        limit     = limit ? parseInt(limit) : process.env.limit;
        offset    = page > 1 ? ((page-1)*limit) : 0;
        orderBy   = { [sortField]:direction }
    
        let listing = await about.find(where, select, {skip:offset})
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

const get = async (id, select = [], joins = []) => {
    try
    {   
        let record = about.findById(id,select);
        
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

module.exports = { 
    getListing, 
    get
};