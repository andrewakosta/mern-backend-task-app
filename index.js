const express = require('express')
const connetionDB =  require('./config/db')

//Created server
const app = express()

//connection to data base
connetionDB()

//enable express.json
app.use(express.json({extended : true}))
//Port of app
const PORT =process.env.PORT || 4000
 
//Import paths
app.use('/api/users', require('./router/users'))
app.use('/api/auth', require('./router/auth'))
app.use('api/projects',require('./router/projects'))
//start app 
app.listen(PORT, () => {
    console.log('----------------------The server is runing on the port 4000---------------------')
})