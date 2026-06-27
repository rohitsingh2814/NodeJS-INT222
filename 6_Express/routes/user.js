const express=require('express');
const router=express.Router();
const path = require('path');
const {body,validationResult} =require('express-validator');


router.get('/register',(req,res)=>{
   res.sendFile(path.join(__dirname,'../public/register.html'));
})


router.post('/register',[body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("enter valid email"),
     body('password').isLength({min:6}).withMessage("password 6 characters long")],(req,res)=>{

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
   res.send(`
    <script>
    alert("${req.body.name} successfuly registered");
    window.location.href="/user/register";
    </script>`);
})

module.exports = router;