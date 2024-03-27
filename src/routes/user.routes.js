const express = require('express');
const userRouter = express.Router();
const { createUser, authenticate, logout, getUsers } = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware")


userRouter.post("/register", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.post("/logout", logout);
userRouter.get("/", getUsers);

module.exports =  userRouter; 