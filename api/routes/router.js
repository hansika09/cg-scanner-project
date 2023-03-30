const express = require("express");
const router = express.Router();
const result = require("../models/resultSchema");



router.post("/register", async(req, res) => {
    // console.log(req.body);
    const {name, status, queued, scanning, finished, type, rule, path, pos, desc, severity} = req.body;

    if(!name || !status || !queued || !scanning || !finished) {
        res.status(422).json("Please fill the data first");
    }

    try {
        const preresult = await result.findOne({name:name}); //first one is from database and second one is the value we get from user
        console.log(preresult);

        if(preresult) {
            res.status(422).json("Repo with same name has already been created");
        } else {
            const addresult = new result({
                name, status, queued, scanning, finished, type, rule, path, pos, desc, severity
            });

            await addresult.save();
            res.status(201).json(addresult);
            console.log(addresult);
        }
    } catch (err) {
        res.status(422).json(err);
    }
})

router.get("/getdata", async(req, res) => {
    try {
        const userdata = await result.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (error) {
        res.status(422).json(err);
    }
})

// get individual userdata
router.get("/getuser/:id", async(req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await result.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);
    } catch (err) {
        res.status(422).json(err);
    }
})

// update user data
router.put("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await result.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete user
router.delete("/deleteuser/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const deleteuser = await result.findByIdAndDelete({_id:id})

        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;