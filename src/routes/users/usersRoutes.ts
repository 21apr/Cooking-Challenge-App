import express from "express";
import { login, register } from "../../controllers/users/setUser";
import { getUser } from "../../controllers/users/getUser";
import { checkUser } from "../../controllers/middlewares/loginMid";

const router = express.Router();


router.post("/login", login).post("/register", register).get("/getUser",checkUser, getUser);

export default router;