const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userData = require("../../models/userdata");
const employeeReview = require("../../models/userreviewdata")


router.post('/signup', (req, res) => {
    userData.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message:"User already exists"
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else{
                    const user = new userData({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        toreview: [],
                        reviewedby: []
                    })
                    user
                    .save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message:"User successfully added"
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error:err
                        })
                    })

                }
            })
        }
    })
    
})

router.post("/login", (req, res) => {
    userData.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: "Authentication failed"
                });
            }
            if(result){
                const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                }, "secret", {expiresIn: "1h"})

                return res.status(200).json({
                    message: "Authentication successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Authentication failed"
            })
        })
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.get("/loademployees", (req, res) => {
    userData.find()
    .exec()
    .then(docs => {
        console.log(docs)
        res.status(200).json({currentemployees:docs})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})

router.put("/assignreviews", (req, res) => {
   if(req.body.email && req.body.employeenames !== undefined){
    userData.updateOne({email: req.body.email}, { $addToSet: { toreview : req.body.employeenames } })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({result})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
  }
  else{
      res.status(500).json({
          error:"Please enter valid input"
      })
  }

})

router.get("/activeemployee/:email", (req, res) => {
    userData.findOne({email: req.params.email})
    .exec()
    .then(doc => {
        res.status(200).json({
            activeemployee:doc
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.put('/submitreview', (req, res) => {
    if(req.body.reviewedemployee && req.body.reviewer && req.body.review){
    userData.updateOne({email: req.body.reviewedemployee}, { $addToSet: {reviewedby :[{name: req.body.reviewer, review: req.body.review}]} })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({result})
    })
    .catch(err => {
        console.log(error)
        res.status(500).json({
            error: err
        })
    })
  }
  else{
    res.status(500).json({
        error:"Please enter valid input"
    })
  }
})

router.delete('/delete/:email', (req, res) => {
    const emailId = req.params.email
    userData.remove({email: emailId})
    .exec()
    .then(result => {
       res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

module.exports = router