import express from 'express';
import usersRouter from './routes/users/usersRoutes';
import recipesRouters from './routes/recipes/recipesRoutes';
import 'dotenv/config'
const app = express();
import cookieParser from 'cookie-parser';
const port = 3000;



//connection to db
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const secretDB = process.env.SECRETMONGODB as string;
mongoose.connect(secretDB).then(()=>{
  console.log('connected to db')
})
.catch((err:any)=>{
  console.log(err)
});

//middlewares
app.use(express.json());
app.use(cookieParser());


app.use(express.static('public'));

app.use('/users',usersRouter);
app.use('/recipes', recipesRouters);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})