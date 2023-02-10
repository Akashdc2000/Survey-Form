const express = require('express')
const router = new express.Router();

const { getall, addResponse, deleteResponse, getResponseBySurveyId, updateResponse, getResponseID } = require('../controllers/responses_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Responses of a Survey</h1>")
})

router.get('/getall', getall)
router.get('/get/:_id', getResponseBySurveyId)
router.post('/addresponse/:_id', addResponse)
router.put("/update/:_id", updateResponse)
router.delete("/delete/:_id", deleteResponse)


router.post('/get',getResponseID)
module.exports = router;
