const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://deboraramos005:vLZI6acr3jinemVT@api-mbl.78iko4s.mongodb.net/?retryWrites=true&w=majority&appName=api-mbl');

const Serie = mongoose.model('Serie', { 
    tittle: String,
    description: String,
    image_url: String,
    trailer_url: String,
 });

app.get("/", async (req,res) => {
    const series = await Serie.find()
    return res.send(series)
})

app.delete("/:id", async (req,res) => {
    const serie = await Serie.findByIdAndDelete(req.params.id)
    return res.send(serie)
} )

app.put("/:id", async (req,res) => {
    const serie = await Serie.findByIdAndUpdate(req.params.id, {
        tittle: req.body.tittle,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url 
    },{
        new : true
    })
    return res.send(serie)
} )

app.post("/", async (req,res) => {
    const serie = new Serie({
        tittle: req.body.tittle,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await serie.save()
    return res.send(serie)
})


app.listen(port,() => {
    console.log('app running')
})