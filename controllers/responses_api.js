const responseModel = require('../models/responses_model')

//Get All Responses
const getall = async (request, response) => {
    try {
        const result = await responseModel.find({});
        if (result.length <= 0)
            response.status(404).json({ "msg": "No response Found..." })
        else
            response.status(200).json({
                "msg": `Total ${result.length} Responses`,
                "Responses": result
            })
    } catch (error) {
        response.send(error)
    }
}

//Get Response By a Title/Name
const getResponseByTitle = async (request, response) => {
    try {
        const title = request.params.title;
        const result = await responseModel.find({ title: title });
        if (result.length <= 0)
            response.status(404).json({ "msg": "No response Found..." })
        else
            response.status(200).json({
                "msg": `Total ${result.length} Responses`,
                "Responses": result
            })
    } catch (error) {
        response.send(error)
    }
}


//Add new Response
const addResponse = async (request, response) => {

    const { title, email, survey } = request.body;

    const existingResponse = await responseModel.findOne({ title: title, email: email })

    if(!existingResponse ){
        const result = await responseModel.create({
            title: title,
            email: email,
            survey: survey
        })
        result.save((error, doc) => {
            if (error)
                response.send(error);
            else
            response.status(200).json({
                "msg": `Response Recorded...`,
                "Response": doc
            })
        })
    }
    else{
        response.status(409).json({"Msg":"You have already submitted Response..."})
    }

}


//Update Response
const updateResponse = async (request, response) => {
    const { title, email, survey } = request.body;
    const updatedResponse = {
        title: title,
        email: email,
        survey: survey
    }
    const id = request.params._id
    try {
        const result = await responseModel.findByIdAndUpdate(id, updatedResponse);
        if (!result)
            response.status(404).json({ "msg": "Response Not Present in Database...." })
        else
            response.status(200).json({
                "msg": `Following Response Updated Succesfully...`,
                "Responses": updatedResponse
            })
    } catch (error) {
        response.status(404).json({ "msg": "error" })
    }

}



//Delete Response
const deleteResponse = async (request, response) => {

    const id = request.params._id;
    try {
        responseModel.findByIdAndDelete(id, (error, doc) => {
            if (error) response.status(404).json(error)
            if (!doc)
                response.status(404).json({ "msg": "Response Not Present in Database...." })
            else
                response.status(200).json({
                    "msg": `Following Response Deleted Succesfully...`,
                    "Responses": doc
                })
        });

    } catch (error) {
        response.status(404).json({ "msg": "Response Not Present in Database...." })
    }
}


module.exports = {
    getall, addResponse, getResponseByTitle, deleteResponse, updateResponse
}