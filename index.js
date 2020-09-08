const express = require('express')
const connetionDB =  require('./config/db')

//Created server
const app = express()

//connection to data base
connetionDB()
//Port of app
const PORT =process.env.PORT || 4000
 
//Import paths
app.use('/api/users', require('./router/users'))

app.get('/', (req, res) => {
    res.send('MERM Tasks')
})
//start app 
app.listen(PORT, () => {
    console.log('The server is runing on the port 4000')
})