const express = require('express')
const router = new express.Router();

const { getall, addResponse,deleteResponse, getResponseByTitle,updateResponse } = require('../controllers/responses_api')

router.get('/', (request, response) => {
    response.send("<h1>Welcome To Responses of a Survey</h1>")
})

router.get('/getall', getall)
router.get('/get/:title', getResponseByTitle)
router.post('/addresponse',addResponse)
router.put("/update/:_id",updateResponse)
router.delete("/delete/:_id",deleteResponse)


module.exports = router;
