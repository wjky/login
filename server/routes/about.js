const express = require('express')
const router = express.Router();

router.get('/about', (req, res) => res.send.send('我是关于我们的页面'))

module.exports = router;