import User from '../mongodb/models/user.js';

const getAllUsers = async(req,res) =>{
    try {
        const users = await User.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async(req,res) =>{
    try{
        console.log('reached here ');
        const {username,password} = JSON.parse(req.body);
        console.log(req.body);
        const userExists = await User.findOne({username});
        if (userExists){
            return res.stats(200).json(userExists);
        }
    
        const newUser = await User.create({
            username,
            password // supposed to be an empty projects list
        });
        console.log(newUser);
        res.status(200);
        res.send(newUser);
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

const getUserInfoByID = async(req,res) =>{
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id }).populate("allProperties");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export{
    getAllUsers,
    createUser,
    getUserInfoByID
};