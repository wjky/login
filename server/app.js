const express = require('express')
const app = express()
const port = 3000
const cors=require('cors')
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/about',require('./routes/about.js'))
app.use('/user',require('./routes/user.js'))

app.listen(port, () => console.log(`服务器已启动！`))