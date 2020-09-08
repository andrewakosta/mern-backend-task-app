const express = require('express')
const { response } = require('express')

//Created server
const app = express()

//Port of app
const PORT =process.env.PORT || 4000

app.get('/', (request, response) => {
    console.log('putos')
    response.send('MERM Tasks')
})
//start app 
app.listen(PORT, () => {
    console.log('The server is runing on the port 4000')
})