const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const userModel = require('./model/userModel')

const app = express()
app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname,'Upload')))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Upload/')
    },
    filename:(req,file,cb)=>{
        cb(null,'image'+"_"+Date.now()+path.extname(file.originalname))
    }
})

const Upload = multer({storage:storage})
mongoose.connect('mongodb://localhost:27017')
.then(res=>console.log('database connected successfuly'))
.catch(err=>console.log(err)
)



app.post('/upload', Upload.single('image'),async(req,res)=>{
    console.log(req.file.filename);
    
    try {
        const imagepath = req.file.filename
        const store = userModel({image:imagepath})
        await store.save()
        res.status(200).send("image send success fully")
    } catch (error) {
        
    }
})

app.get('/',async(req,res)=>{
    try {
        const get = await userModel.find()
        res.send(get).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    console.log(req.params)
    try {
        const response = await userModel.findByIdAndDelete(id)
        res.send('delete successfully').status(200)
    } catch (error) {
        
    }
})



app.listen(3000, ()=>{
    console.log('server run in 3000')
})