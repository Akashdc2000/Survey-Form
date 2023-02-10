const responseModel = require('../models/responses_model')
const formsModel = require('../models/forms_model')

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
const getResponseBySurveyId = async (request, response) => {
    try {
        const survey_id = request.params._id;
        const result = await responseModel.find({ survey_id:survey_id });
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

    const { title,email, survey } = request.body;

    const existingSurvey = await formsModel.findOne({ _id: request.params._id })
    if(!existingSurvey){
        response.status(409).json({ "Msg": "No Form For the given Survey ID" })
    }
    const existingResponse=await responseModel.findOne({title:title,email:email})
    if (!existingResponse) {
        const result = await responseModel.create({
            survey_id: request.params._id,
            title: title,
            email:email,
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
        response.status(200).json({"msg":"Response already Submitted.."})
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


//Get Response ID
const getResponseID = async (request, response) => {
    try {
        const {title,email} = request.body;
        const result = await responseModel.findOne({ title:title,email:email });
        if (result.length <= 0)
            response.status(404).json({ "msg": "No Response Found..." })
        else
            response.status(200).json({"response_id":result._id})
    } catch (error) {
        response.send(error)
    }
}

module.exports = {
    getall, addResponse, getResponseBySurveyId, deleteResponse, updateResponse,getResponseID
}