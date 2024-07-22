import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import imageDownloader from 'image-downloader';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { mongoDBURL1 } from './config1.js';
import Booking from './models/Booking.js';
import { User } from './models/userModel.js';

import Place from './models/Place.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 



import jwt from 'jsonwebtoken';


const app=express();
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

const bcryptSalt=bcrypt.genSaltSync(10)
const jwtSecret='ljkhbgb'


mongoose.connect(mongoDBURL1)
app.get('/test',(req,res)=>{
    console.log(req)
    res.json('test ok');
});

app.post('/register',async(req,res)=>{
    const {username,password,email}=req.body;

    try{
    const temp_user=await User.create({
        username,
        password:bcrypt.hashSync(password,bcryptSalt),
        email,
    });
    res.json(temp_user);}
    catch(e){
        res.status(422).json(e)
    }

})

app.post('/login',async (req,res)=>{
    const {email,password}= req.body;
    if(!email||!password){res.status(400).json('email and password are required')}
    const temp_user=await User.findOne({email});
    
    if(temp_user){
        
        const passOk=bcrypt.compareSync(password,temp_user.password)
        if(passOk){
            jwt.sign({email:temp_user.email, id:temp_user._id},jwtSecret,{},(err,token)=>{
                if(err) throw err;
                
            
            res.cookie('token',token).json(temp_user)
        })
        }else{
            res.status(422).json('pass not ok')
        }
    }
    else{
        
        res.status(404).json('not found')
        
    }
})

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async(err,userData)=>{
            if(err) throw err;

            const {username,email,_id} =await User.findById(userData.id)//so that name appears even after refreshing
            res.json({username,email,_id})
        });
    }else{
        res.json(null)
    }
    
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true)
})

console.log({__dirname})

app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body;
    const newName='photo'+ Date.now() +'.jpg';
    await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/'+ newName,
    });
    res.json(newName)
    console.log({newName})
    
})

const photosMiddleware=multer({dest:'uploads/'})
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles=[]
    //console.log(req.files)
    for (let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        const parts =originalname.split('.');
        const ext=parts[parts.length-1]
        const newPath=path +'.' +ext
        fs.renameSync(path,newPath)
        uploadedFiles.push(newPath.replace('uploads/',''))
    }
    console.log(uploadedFiles)
    res.json(uploadedFiles)
    

})

app.post('/places',(req,res)=>{

    const {token}=req.cookies;

    const {title,address,addedPhotos,description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price,
    }=req.body;


    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
        const placeDoc=await Place.create({
            owner: userData.id,
            title,address,photos: addedPhotos,description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price,

        })
        res.json(placeDoc);
    })
   

})


app.get('/user-places',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        const {id}=userData;
        res.json(await Place.find({owner:id}))
    })

})

app.get('/places/:id',async(req,res)=>{
    const {id} =req.params
    res.json(await Place.findById(id) )
})

app.put('/places',async(req,res)=>{
    
    const {token}=req.cookies;

    const {id,title,address,addedPhotos,description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price,
    }=req.body;
    
    jwt.verify(token,jwtSecret,{},async(err,userData)=>{
        if(err) throw err;
        const placeDoc= await Place.findById(id);
        if(userData.id===placeDoc.owner.toString()){
            placeDoc.set({
                title,address,photos:addedPhotos,description,perks,extraInfo,checkIn,
                checkOut,maxGuests,price,
            })
            await placeDoc.save()
            res.json('ok')

        }
    })



})

app.get('/places',async(req,res)=>{
    res.json(await Place.find())
})

function getUserDataFromReq(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtSecret,{}, async(err,userData)=>{
        if(err) throw err
        resolve(userData)
    })
})
}

app.post('/bookings',async(req,res)=>{
    const userData=await getUserDataFromReq(req)
    const {place,checkIn,checkOut,numberOfGuests,name,phone,price}=req.body;
    Booking.create({place,checkIn,checkOut,numberOfGuests,name,phone,price,
        user:userData.id,
    })
    .then((doc)=>{
        
        res.json(doc)
    }).catch((err)=>{
        throw err;
    })


})



app.get('/bookings',async(req,res)=>{
    const userData=await getUserDataFromReq(req)
    res.json(await Booking.find({user:userData.id}).populate('place'))
})


app.listen(5007)
