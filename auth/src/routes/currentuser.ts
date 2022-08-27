import express from "express";

const router = express.Router();

router.get('/api/users/currentuser', (req, res) =>{
    res.send("Request received at /currentuser route");
});

export { router as currentUserRouter };