import Kitchen from '../model/Kitchen.js';
import User from '../model/User.js';
import mongoose from "mongoose";

//get all kitchen
export const getAllKitchens = async(req, res, next) => {
    let kitchens;

    try {
        kitchens = await Kitchen.find().populate("user");
    } catch(err) {
        return console.log(err)
    }
    if(!kitchens) {
        return res.status(404).json({message: "No Items in Kitchen Found"})
    }
    return res.status(200).json({kitchens});
};

//add item
export const addKitchen = async(req, res, next) => {
    const {title, description, user} = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
        return res.status(400).json({message:"Unable to Find User By This ID"})
    }
    const kitchen = new Kitchen({
        title,
        description,
        // image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await kitchen.save({session});
        existingUser.kitchens.push(kitchen);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(200).json({kitchen});
};

//update item
export const updateKitchen = async(req, res, next) => {
    const {title, description} = req.body;
    const kitchenId = req.params.id;
    let kitchen;
    try {
        kitchen = await Kitchen.findByIdAndUpdate(kitchenId, {
        title,
        description
        });
    } catch(err) {
        return console.log(err)
    }
    if(!kitchen) {
        return res.status(500).json({message: "Unable To Update The Kitchen"});
    }
    return res.status(200).json({kitchen});   
};

//get item by ID
export const getById = async(req, res, next) => {
    const id = req.params.id;
    let kitchen;

    try {
        kitchen = await Kitchen.findById(id);
    } catch(err) {
        return console.log(err);
    }
    if(!kitchen) {
        return res.status(404).json({message: "No Item in Kitchen Found"});
    }
    return res.status(200).json({kitchen});
}

//delete item
export const deleteKitchen = async(req, res, next) => {
    const id = req.params.id;

    let kitchen;
    try {
        kitchen = await Kitchen.findByIdAndRemove(id)
        .populate('user');
        await kitchen.user.kitchens.pull(kitchen);
        await kitchen.user.save();
    } catch(err) {
        console.log(err);
    }
    if (!kitchen) {
        return res.status(500).json({message:"Unable To Delete"});
    }
    return res.status(200).json({message:"Successfully Deleted "});
};

//Get users kitchen
export const getByUserId = async(req, res, next) => {
    const userId = req.params.id;
    let userKitchens;
    try {
        userKitchens = await User.findById(userId).populate("kitchens");
    } catch(err) {
        return console.log(err);
    }
    if(!userKitchens) {
        return res.status(404).json({message:"No Items in Kitchen Found"})
    }
    return res.status(200).json({user:userKitchens})
}