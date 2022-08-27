import express from "express";

const router = express.Router();

router.post('/api/users/signin', (req, res) =>{
    res.send("Request received at /signin route");
});

export { router as signInRouter };