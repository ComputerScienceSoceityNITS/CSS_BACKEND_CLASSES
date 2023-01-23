var fs = require('fs');

const fetchAllBlogs=(req,res)=>{
    fs.readFile('./Data/blogs.json','utf8',(err,data)=>{
        console.log(JSON.parse(data).blogs[0].title)

        res.status(200).json(JSON.parse(data));
    })
}

const addBlog=(req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const user=req.body.user;

    fs.readFile('./Data/blogs.json','utf8',(err,data)=>{
    let filedata=JSON.parse(data).blogs;
    filedata.unshift({title,description,user});
    fs.writeFile('./Data/blogs.json',(JSON.stringify({"blogs": filedata})),(err)=>{
    if(err){
        console.log(err)
    }
   })
    res.status(200).json('yooo')
    })
}

const updateBlog=(req,res)=>{
    const title=req.body.title;
    const newtitle=req.body.newtitle;
    const description=req.body.description;
    const user=req.body.user;
    
    fs.readFile('./Data/blogs.json','utf8',(err,data)=>{
        let filedata=JSON.parse(data).blogs;
        let blog=filedata.filter((item)=>item.title==title && item.user==user);

        if(blog.length==0){ 
            res.status(200).json({error:'No Such Blog By You'});
            return;
        }
        else{
            blog=blog[0];
            blog.title=newtitle;
            blog.description=description; 
            blog.user=user;
        }

        for(let i=0;i<filedata.length;i++){
           if(filedata[i].title==title && filedata.user==user){
            filedata[i]=blog;
           }
        }
        
        fs.writeFile('./Data/blogs.json',(JSON.stringify({"blogs": filedata})),(err)=>{
        if(err){
            console.log(err)
        }
       })
        res.status(200).json('blog updated')
        })

}

const deleteBlog=(req,res)=>{
    const title=req.body.title;;
    const user=req.body.user;
    
    fs.readFile('./Data/blogs.json','utf8',(err,data)=>{
        let filedata=JSON.parse(data).blogs;
        let blog=filedata.filter((item)=>(item.title==title && item.user==user));
        if(blog.length==0){
            res.status(200).json({error: "No Such Blog"});
            return;
        }
        blog=filedata.filter((item)=>!(item.title==title && item.user==user));
        fs.writeFile('./Data/blogs.json',(JSON.stringify({"blogs": blog})),(err)=>{
            if(err){
                console.log(err)
            }
           })

        res.status(200).json('blog deleted')
        })
}
module.exports={fetchAllBlogs,addBlog,updateBlog,deleteBlog}; 