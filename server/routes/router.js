const express=require("express")
const route=express.Router()
const controller=require('../controller/controller')
const axios=require('axios')
const bcrypt=require('bcrypt')

const User=require('../model/model')

function check_session(req,res,next){
  if(req.session.authorized){
    next()
  }else{
    res.render('register');
  }
}

route.get('/',check_session,(req,res)=>{
    
    res.render('home',{name:this.name});
})



route.get('/forgot',(req,res)=>{
  res.render('pass');
})

route.get('/logout',(req,res)=>{
  req.session.destroy()
  console.log(req.session);
  res.render('login');

})



route.get('/admin_panel',check_session,async(req,res)=>{
  const data=await User.find()
  console.log(data);
  res.render('index',{users:data})
 
})
route.get('/log_in', (req, res) => {
  res.render('login',  {messages: 'hai'});
});




route.post('/log_in', async (req, res) => {
  const email = req.body.email;
 
  const password = req.body.password;


  try {
    const user = await User.findOne({ email: email });
    

    if (user) {
     

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      if (email === 'admin123@gmail.com') {
        req.session.admin = email;
        req.session.authorized = true;
        res.redirect('/admin_panel');
      } else {
        req.session.user = email;
        req.session.authorized = true;
        res.redirect('/');
      }
    } else {
      res.render("login", { message: "Invalid entry" });
    }
  } }catch (error) {
    console.error(error);
    res.send('An error occurred while logging in.');
  }
});
  

route.get('/add-user',(req,res)=>{
    res.render('add-user');
})

route.get('/update-user',(req,res)=>{
    axios.get('http://localhost:2008/api/users',{params:{id:req.query.id}})
        .then(function(userdata){
   
            res.render('update_user',{user : userdata.data});
        })
        .catch(err=>{
            res.send(err)
        })   
})


route.post('/api/users',controller.create)
route.get('/api/users',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)

// route.get('/uppass',controller.updatepass)
route.get('/api/aaa',controller.update_password )


route.get('/search', check_session,(req, res) => {
  const query = req.query.name; // Get the search query from the URL query parameters

  // Perform the search using Mongoose
  User.find({ name: { $regex: new RegExp(query, 'i') } })
    .then(users => {
      res.render('index', { users });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports=route