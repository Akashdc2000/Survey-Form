const express = require('express')
const { register, login, getall, update, deleteUser } = require('../controllers/user_api')
const router = new express.Router();


router.get('/', (request, response) => {
    response.send("<h1>All Users</h1>")
})


router.get('/getall', getall);

router.post('/register', register);
router.post('/login', login)
router.put('/update/:_id', update)
router.delete('/delete/:_id', deleteUser)



module.exports = router;
