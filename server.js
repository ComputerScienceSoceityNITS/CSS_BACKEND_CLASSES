const express=require('express');
const app=express();
const blogrouter=require('./Routers/blogrouter');
const userrouter=require('./Routers/userrouter');


app.use(express.json());
app.use('/blog',blogrouter.router);
app.use('/user',userrouter.router);


app.listen(5000,()=>{console.log("up and running")}); 