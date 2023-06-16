var usersSchema=require('../model/model')

const bcrypt = require('bcrypt');


//create and save new user
exports.create=(req,res)=>{
    

  // Hash the password
const saltRounds = 10; // You can adjust the number of salt rounds as needed
bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while hashing the password"
        });
        return;
    }

    // Create a new user with the hashed password
    const user = new usersSchema({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        password: hash // Set the hashed password
    });

    // Save user in the database
    user
        .save(user)
        .then(data => {
            res.redirect('/log_in');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
});

}
    

//retieve and return a single/all users
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id

        usersSchema.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"cannot find user with id:"+id});
                }else{
                    res.send(data);
                  
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:"error retrieving user with id:"+id
                })
            })
    }else{
        usersSchema.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"error occured while retrieving user information"
            })
        })
    }
}

exports.update=(req,res)=>{

        if(!req.body){
            return res
            .status(400)
            .send({message:"data to update cannot be empty"})
        }
        const id=req.params.id;
        usersSchema.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
     
        .then(data=>{
           
            
            
            if(!data){
                res.status(404).send({message:`cannot update user with $(id).May be user not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({ message:"error update user information"})
        })
        
        
    
}
//delete

exports.delete=(req,res)=>{
    const id=req.params.id;

    usersSchema.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`cannot delete with id $(id).May be id is wrong`})
            }else{
                res.send({
                    message:"user was deleted successfully "

                })
            }
        })
        .catch(err=>{
            res.status(500).send({ message:"could not delete user with id :"+id})
        })
}




exports.update_password=(req,res)=>{
    const email = req.query.email;
  const ps = req.query.password;
  usersSchema.findOne({ email: email })
    .then((user) => {
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      bcrypt.hash(ps, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Some error occurred while hashing the password"
          });
        } else {
            usersSchema.findOneAndUpdate({ email: email }, { password: hash }, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({ message: `Cannot update user with ID: ${email}. User not found.` });
              } else {
                
                res.render('login',{message:"Successfully updated password"});
              }
            })
            .catch(err => {
              res.status(500).send({ message: "Error updating user information" });
            });
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: "Error finding user" });
    });
}