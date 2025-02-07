const urlModel = require('../models/url');
const shortid = require('shortid');

const handleCreateShortURL = async (req, res) => {
    const url = req.body.url;
    const shortID = shortid();

    try{

        const shorturl = await urlModel.create({
            URL: url,
            customURL: shortID
        });

        if(!shorturl){
            res.json({
                success: false,
                message: "Creation Failed"
            });
        }

        // if created successfully
        res.status(201).json({
            success: true,
            id: shorturl.customURL
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const handleGetShortURL = async (req, res) => {
    const id = req.params.id;
    try{
        const entry = await urlModel.findOne({customURL: `${id}`});

        if(!entry){
            res.json({
                success: false,
                message: 'Internal Server'
            })
        }

        res.redirect(entry.URL);
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const handleGetAllURL = async (req, res) => {
    try{
        const allURL = await urlModel.find({});
        if(!allURL){
            res.json({
                success: false,
                messge: "Internal server error"
            });
        }

        //if caught up data 
        res.status(200).json(allURL);
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    handleCreateShortURL,
    handleGetShortURL,
    handleGetAllURL
};