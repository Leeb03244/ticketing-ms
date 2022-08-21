import express from "express";
import {json} from "body-parser";

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req,res)=>{
    res.send('Testing comms with pod');
});


app.listen(3000, ()=>{
    console.log("Auth service listening on port 3000")
});
