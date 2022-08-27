import express from "express";

const router = express.Router();

router.post('/api/users/signout', (req, res) =>{
    res.send("Request received at /signout route");
});

export { router as signOutRouter };