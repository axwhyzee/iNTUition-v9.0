import User from '../mongodb/models/user';

const getAllUsers = async(req,res) =>{};

const createUser = async(req,res) =>{
    try{
        const {username,password, allProjects} = req.body;
        const userExists = await User.findOne({username});
        if (userExists){
            return res.stats(200).json(userExists);
        }
    
        const newUser = await User.create({
            username,
            password,
            allProjects // supposed to be anempty projects list
        });
    
        res.status(200).json(newUser);
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

const getUserInfoByID = async(req,res) =>{};

export{
    getAllUsers,
    createUser,
    getUserInfoByID
}