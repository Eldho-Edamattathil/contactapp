const express=require("express")
const router=express.Router()

const {getContact,createContact,editContact,deleteContact,viewContact}=require("../controllers/contactcontrollers")
const validateToken = require("../middleware/validateTokenHandler")
router.use(validateToken)
router.get("/",getContact)

router.post("/",createContact)

router.get("/:id",viewContact)

router.put("/:id",editContact)
router.delete("/:id",deleteContact)


module.exports=router