const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')
const auth = require('../middleware/auth.js');
const nodemon = require('nodemon');

// Register

const signup = async (req, res) => {
   const { firstName, lastName, email, password, confirmPassword } = req.body;
   try {
   // Validation

   if(!email || !password || !confirmPassword || !firstName || !lastName)
   return res.status(400).send({ errorMessage: "Please fill all the required feild."});

   if(password.length < 8)
   return res.status(400).send({ errorMessage: "Please enter a password of at least 8 chracters."})
   
   if(password !== confirmPassword)
   return res.status(400).send({ errorMessage: "Please enter a same password twice."})
   
   const existingUser = await User.findOne({email: email})
   if(existingUser)
   return res.status(400).send({ errorMessage: "An account with this email already exists."})

   // hash the password

   const hashedPassword = await bcrypt.hash(password, 12);

   // save a new user account to the db

   const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

   // generate jwt token
   const token = jwt.sign({ email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: "1h" });

   // send the token in a HTTP-only cookie

//    res.cookie("token", token, {
//     httpOnly: false,  
//     secure: false 
//    }).send()

   // send result & token
    res.status(200).json({ result: result, token})

   } catch (error) {
    res.status(500).json({ message: 'something went worng.'})
   }
}

// Log In/ Sign In

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // validate
        if(!email || !password )
        return res.status(400).send({errorMessage: "Please fill all the required feild."})


        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({ message: "Inavaild Credentials."});

        // Generate JWT token
        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: "1h" })

        // send the token in a HTTP-only cookie
            // res.cookie("token", token, {
            // httpOnly: false,
            // secure: false,  
            // })
            // res.status(200).json({result: existingUser, token})
        // send result & token    
         res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({ message: 'something went worng.'})
    }
}

// Sign Out/ Log Out

const signout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send();
}

const profile = async (req, auth, res) => {
    const { email } = req.body;

    const profile = await User.findOne({ email })

    console.log(profile);

    res.status(200).json({ result: profile})

}

module.exports = {signin, signup, signout, profile}