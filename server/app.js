import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes.js';
import router from './routes/user-routes.js';
import kitchenRouter from './routes/kitchen-routes.js';
import cors from 'cors';

const app = express();
app.use(cors());

//middleware
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog", blogRouter);
app.use("/api/kitchen", kitchenRouter);

mongoose
.connect(
    `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.sqni9ms.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`
)
.then(() => app.listen(4000))
.then(() => 
    console.log("Connected to the Database and listening to localhost 4000")
    )
    .catch((err) => console.log(err));


