const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel")


const getContact= async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
}

const createContact= asyncHandler(async(req,res)=>{

    const {name,email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
            throw new Error("All fields are mandatory")
        }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    
    res.status(200).json(contact)
})



const editContact= asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user._id.toString()!==req.user.id){
        res.status(401);
        throw new Error("User didn't have the permisssion to edit the contact")
    }

    const updatedcontact=await Contact.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(updatedcontact)
})

const viewContact= asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


const deleteContact= asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    if(contact.user._id.toString()!==req.user.id){
        res.status(401);
        throw new Error("User didn't have the permisssion to delete the contact")
    }
    await Contact.deleteOne()
    res.status(200).json(contact)
})



module.exports={getContact,createContact,editContact,viewContact,deleteContact};