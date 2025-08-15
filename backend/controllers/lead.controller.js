
const {Op} = require("sequelize");

const Lead = require("../models/lead.model.js");


const addLead = async (req, res) => {
    try {
        let info = {
        id: req.body.id,
        name: req.body.name,
        number: req.body.number,
        owner_id: req.body.owner_id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt
        }


        //save user in DB
        const lead = await Lead.create(info);
        res.status(201).json({ status: "200", success:true,  message: "Lead added successfully", data: lead });
        console.log("Lead added successfully:", lead);
    } catch (error) {
        console.error("Error adding lead:", error);
        res.status(500).json({success:false, message:"upload failed", error: error.message});
    }

    

};


const getAllLeads = async (req, res) => {
    try {
        //query parameters extraction from url
        const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Default to page 1 if not provided page=2
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10; // Default to 10 items per page if not provided pageSize=10
        const sortFields = req.query.sort ? req.query.sort.split(',') : ['name']; // Default sort by userName sort=userName,email
        const orderDirection = req.query.order?.toUpperCase() || 'ASC'; // Default order is ascending
        const search = req.query.search || ''; // Default to empty search if not provided
        const requestedFields = req.query.fields ? req.query.fields.split(',').map(field => field.trim()) : ['name', 'id', 'number', 'owner_id']; // Default fields to return

        //Validate page and pageSize
        if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
            return res.status(400).json({ status: "400", success: false, message: "Invalid pagination parameters." });
        }

        // Validate sort fields
        const validSortFields = ['id', 'name', 'number', 'owner_id'];
        const invalidFields = sortFields.filter(field => !validSortFields.includes(field));
        if (invalidFields.length > 0) {
            return res.status(400).json({ status: "400", success: false, message: `Invalid sort fields: ${invalidFields.join(', ')}` });
        }

        //validate order direction
        if (!['ASC', 'DESC'].includes(orderDirection)) {
            return res.status(400).json({ status: "400", success: false, message: "Invalid order direction. Use 'ASC' or 'DESC'." });
        }

        // Validate requested fields
        const validFields = ['id', 'name', 'number', 'owner_id']; // Assuming these are the available fields; add more as per model
        if (requestedFields) {
            const invalidFields = requestedFields.filter(field => !validFields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({ status: "400", success: false, message: `Invalid fields: ${invalidFields.join(', ')}` });
            }
        }


        //Calculate pagination offset
        const offset = (page - 1) * pageSize;

        // Build Sequelize order array for multi-field sorting
         // e.g., [['username', 'ASC'], ['email', 'ASC']]
         const order = sortFields.map(field => [field, orderDirection]);



         
        // Execute Sequelize query with pagination, sorting, and ordering
        const {count, rows} = await Lead.findAndCountAll({
            attributes: requestedFields || ['name', 'number', 'id', 'owner_id'], //fields to sort
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { number: { [Op.like]: `%${search}%` } }
                ]
            },
            order, //apply sorting and ordering
            offset, //skip record for pagination
            limit: pageSize //limit records for pagination
        });

        //calculates total pages
        const totalPages = Math.ceil(count / pageSize);
        res.status(200).json({ status: "200", success: true, message: "Users fetched successfully", data:rows, pagination: { currentPage: page, pageSize, totalItems: count, totalPages} });

    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ status: "500", success: false, message: "An error occurred while fetching users.", error: error.message });
    }

};

const getSingleLead = async (req, res) => {
   
        let id = req.params.id;
        let leads = await Lead.findOne({
            where: { id: id }
        });
    res.status(200).json({ status: "200", success: true, message: "Lead fetched successfully", data: leads });
};



const getLeadsByOwner = async (req, res) => {
  try {
    const owner_id  = req.params.owner_id;

    if (!owner_id) {
      return res.status(400).json({ error: 'owner_id query parameter is required' });
    }

    // // Parse owner_id to integer 
    // const ownerId = parseInt(owner_id, 10);
    // if (isNaN(ownerId)) {
    //   return res.status(400).json({ error: 'owner_id must be a valid integer' });
    // }

    // Fetch all leads where owner_id matches
    const leads = await Lead.findAll({
      where: {
        owner_id: owner_id // Use the owner_id directly from query parameters
      }
    });

    if (!leads) {
      return res.status(404).json({ message: 'No leads found for the given owner_id' });
    }
    return res.status(200).json({
        data: leads,message:"successful"
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


//update lead
const updateLead = async (req, res) => {
    // Get the lead ID from the URL
    const id = req.params.id;
    
    // Get query parameters (fields to return and response format)
    const { fields, return: returnOption } = req.query;

    // Check if requested fields are valid
    if (fields) {
        const validFields = ['name', 'number', 'owner_id', 'id'];
        const requestedFields = fields.split(',');
        const wrongFields = requestedFields.filter(field => !validFields.includes(field));
        
        if (wrongFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `These fields are not allowed: ${wrongFields.join(', ')}`
            });
        }
    }

    // Check if return option is valid
    if (returnOption && returnOption !== 'minimal' && returnOption !== 'full') {
        return res.status(400).json({
            success: false,
            message: "Return option must be 'minimal' or 'full'"
        });
    }

    try {
        // Try to update the user with the provided data
        const [rowsUpdated] = await Lead.update(req.body, { where: { id } });
        
        // If no user was updated, they don't exist
        if (rowsUpdated === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // If full response is requested, return the updated user
        if (returnOption === 'full') {
            const updatedUser = await Lead.findByPk(id, {
                attributes: fields ? fields.split(',') : undefined
            });
            return res.status(200).json({
                success: true,
                user: updatedUser
            });
        }

        // Otherwise, return a simple success message
        return res.status(200).json({
            success: true,
            message: 'User updated successfully'
        });

    } catch (error) {
        // Handle validation errors from the database
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                errors: error.errors.map(err => ({
                    field: err.path,
                    message: err.message
                }))
            });
        }

        // Handle any other errors
        return res.status(500).json({
            success: false,
            message: 'Something went wrong on the server'
        });
    }
};

//delete product by id

const deleteLead = async (req, res) => {
    try {
        const id = req.params.id;
        const { force, confirmation } = req.query;  // Destructure query parameters
        
        // Validate 'confirmation' parameter (required for sensitive operations)
        if (!confirmation) {
            return res.status(400).json({
                status: "400",
                success: false,
                message: "Confirmation parameter is required. Add ?confirmation=true to confirm deletion."
            });
        }

        if (confirmation !== "true") {
            return res.status(400).json({
                status: "400",
                success: false,
                message: "Invalid confirmation value. Must be 'true'."
            });
        }

        // Validate 'force' parameter (for hard deletion)
        let forceDelete = false;
        if (force) {
            if (force !== "true" && force !== "false") {
                return res.status(400).json({
                    status: "400",
                    success: false,
                    message: "Invalid force parameter. Must be 'true' or 'false'."
                });
            }
            forceDelete = force === "true";
        }

        // Perform deletion
        const options = {
            where: { id },
            force: forceDelete  // For hard-delete if using soft-delete
        };

        const result = await Lead.destroy(options);

        if (result === 0) {
            return res.status(404).json({
                status: "404",
                success: false,
                message: "User not found or already deleted"
            });
        }

        res.status(200).json({
            status: "200",
            success: true,
            message: forceDelete 
                ? "User permanently deleted" 
                : "User soft-deleted",
            count: result
        });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            status: "500",
            success: false,
            message: "An error occurred while deleting the user",
            error: error.message
        });
    }
};

module.exports = {
    addLead,
    getAllLeads,
    getSingleLead,
    updateLead,
    deleteLead,
    getLeadsByOwner
};


