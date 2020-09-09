exports.createUser = (req,res) => {
    console.log(req.body)
    res.body = 'puto el que lo lea'
    return res
}