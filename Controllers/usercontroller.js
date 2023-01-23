var fs = require('fs');
var CryptoJS = require("crypto-js");

const signup=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;

    fs.readFile('./Data/users.json','utf8',(err,data)=>{
       
        let filedata=JSON.parse(data).users;
        let ifexists=filedata.filter((item)=>item.username==username);

        if(ifexists.length!=0){
            res.status(200).json({error:"UserName ALready Exists"});
            return;
        }

        filedata.unshift({username,password:CryptoJS.AES.encrypt(password,'secret key 123').toString()});
        fs.writeFile('./Data/users.json',(JSON.stringify({"users": filedata})),(err)=>{
            if(err){
                console.log(err);
                res.status(200).json({error:"Sometjing went wrong..."});
            }
           })
            res.status(200).json({success:"Signup Succcesfully"})
            })
}

const login=(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    
    if(!username || !password){
        res.status(200).json({error:"Fill ALl The Details"});
        return;
    }  

    fs.readFile('./Data/users.json','utf8',(err,data)=>{
       let users=JSON.parse(data).users;
       let user=users.filter((item)=>item.username==username && CryptoJS.AES.decrypt(item.password,'secret key 123').toString(CryptoJS.enc.Utf8)==password);

       if(user.length==0){
        res.status(200).json({error:"Please Give The Correct Credentials"});
        return;
       }

       res.status(200).json({success:"true",user:user[0].username});
    })
}

module.exports={signup,login};