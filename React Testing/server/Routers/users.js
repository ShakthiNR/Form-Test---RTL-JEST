const express = require("express")
const router = express.Router()
const { createUser, getUniqueUser, getUsers, updateUser, deleteUser } = require("../Controllers/users")
const {check} = require("express-validator")

const validatingRequest = [
    check("email").not().isEmpty().withMessage("User's Email is Required"),
    check("username").not().isEmpty().withMessage("User Name is Required"),
]


router.get("/get/users",getUsers)
router.get("/user/:id",getUniqueUser)
router.post("/create/user",validatingRequest,createUser)
router.patch("/update/user/:id",updateUser)
router.delete("/delete/user/:id",deleteUser)


module.exports = router