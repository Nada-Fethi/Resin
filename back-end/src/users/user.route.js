const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();




router.post("/register",async(req, res) => {
    try{
        const {username,email,password} = req.body;
        const user = new User ( {username,email,password});
        await user.save();
        res.status(201).send({message: "User registered"})
        console.log(req.body)
    }catch(error){
        console.error("Error registering user",error);
        res.status(500).send({message: "Error registering user",})
    }
}
)

router.post('/login', async(req, res) => {
    const {email,password} = req.body;
   try{
    const user = await User.findOne( {email});
    if (!user){
        return res.status(404).send({message: "User not found"})
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).send({message: "Password not match"})

    }
    const token = await generateToken(user._id);


res.cookie('token',token,{
    httpOnly: true,
    secure:true,
    sameSite: 'none'
})


    res.status(200).send({message: "Logged in successfully",token, user:{
        _id: user._id,
        email:user.email,
        username: user.username,
        rote:user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profossion: user.profossion
    } })
   } catch (error){
    console.error("Error logged in user",error);
    res.status(500).send({message: "Error logged in user",})
   }
    }
)

router.post('/logout',(req, res) => {
    res.clearCookie('token');
    res.status(200).send({message:'Logged out successfully'})
})

router.delete("/users/:id",async(req, res) => {
    try{

        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message: "user not found"})
        }
        res.status(200).send({message: "user deleting successfuly"})
    }catch(error){
        console.error("Error deleting user",error);
        res.status(500).send({message: "Error deleting user",})
    }
})

router.get("/users",async(req, res) => {
    try{

        const users = await User.find({}, 'id email role username').sort({createdAt: -1});
        res.status(200).send(users)
    }catch(error){
        console.error("Error fetching users",error);
        res.status(500).send({message: "Error fetching users",})
    }
})

router.put("/users/:id",async(req, res) => {
    try{

        const {id} = req.params;
        const {role} = req.body;
        const user =await User.findByIdAndUpdate(id, {role}, {new: true});
        if (!user) {
            return res.status(404).send({message: 'User not found'})
        }
        res.status(200).send({message: 'User role updated successfully',user})
    }catch(error){
        console.error("Error updating user role",error);
        res.status(500).send({message: "Error  updating user role",})
    }
})


router.patch("/edit-profile",async(req, res) => {
    try{

        const {userId, username,profileImage, bio , profession} = req.body;

        if (!userId) {
            return res.status(400).send({message: 'User ID is required'})
        }

        const user =await User.findById(userId);

        if (!user) {
            return res.status(400).send({message: 'User not found'})

        }

        if (username !== undefined) user.username = username;
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (bio !== undefined) user.bio = bio;
        if (profession !== undefined) user.profession = profession;


        await user.save();
        res.status(200).send({message: "Profile updated successfully",user:
            {
                _id: user._id,
                email:user.email,
                username: user.username,
                rote:user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profossion: user.profossion,
            }
        })



    }catch(error){
        console.error("Error updating user profile",error);
        res.status(500).send({message: "Error  updating user profile",})
    }
})



module.exports = router;