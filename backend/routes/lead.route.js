const leadController = require("../controllers/lead.controller.js");
const  express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const leadRouter = express.Router();



   // Create assets directory if it doesn't exist
    if (!fs.existsSync("assets")) {
    fs.mkdirSync("assets");
    }

    // Set up multer for file uploads
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "assets/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
    });

    const upload = multer({ storage });



leadRouter.post("/leads", leadController.addLead);  
leadRouter.get("/leads", leadController.getAllLeads); 
leadRouter.get("/leads/:id", leadController.getSingleLead);
leadRouter.patch("/leads/:id", leadController.updateLead);
leadRouter.delete("/leads/:id", leadController.deleteLead); 
leadRouter.get("/leads/owner_id/:owner_id", leadController.getLeadsByOwner);

module.exports = leadRouter;
