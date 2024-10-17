const express = require('express');
const router = express.Router();
const commonControler= require("../controllers/commonControler")

router.get('/for_only_test', commonControler.test);
router.get('/login', commonControler.login);
router.get('/getLead', commonControler.getLead);
module.exports = router;