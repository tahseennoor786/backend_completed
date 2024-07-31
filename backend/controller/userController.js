import User from "../model/userModel.js";

// Level Firs (post)

export const create = async (req,res) => {
    try {

        const newUser = new User(req.body);
        const { email } = newUser;

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message: "Your User Already Existed"});
        }
        const savedData = await newUser.save();
        res.status(200).json({ message: "Congretulation User Created Successfully!...."});
    } catch (error) {
        res.status(500).json({errorMessage: error.message});
    }
};

// Level Second (getUser)

export const getAllUsers = async (req, res) => {
    try {
        
        const userData = await User.find();
        if(!userData || userData.length === 0){
            return res.status(404).json({ message: "User Data Not Found"});
        } 

        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({errorMessage: error.message});   
    }
};

// Level Third (getUserById)

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(400).json({ message: "getUserById not find here"});
        }
        res.status(200).json(userExists);
    } catch (error) {
        res.status(500).json({errorMessage: error.message});         
    }
};

// Level Fourth (UpdateUser)

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(400).json({ message: "getUserById not find here"});
        }
     const updatedData = await User.findByIdAndUpdate(id, req.body, {
       new:true
     });
     res.status(200).json(updatedData);

    } catch (error) {
        res.status(500).json({errorMessage: error.message});  
    }
};
 
// Level Five (UserDeleted)

export const deleteUser  = async (req, res) => {
   try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if(!userExist){
        return res.status(400).json({ message: " User Not Found"});
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted Succussfully!...."});
   }catch (error){
    res.status(500).json({errorMessage: error.message});  
   }
}

