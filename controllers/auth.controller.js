import express from "express"
// import { User } from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// signup
export const signup = async(req,res) => {
    try {
         // fetch data from client..
          const {username, email, password} = req.body;

         // validation...

         if(!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details.."
            })
         }

         // is user exist?..

         const isAlreadyExist = await User.findOne({email});
         if(isAlreadyExist) {
           return res.status(400).json({
            success: false,
            message: "You are already signedUp , please login to continue.."
           })
         }

// password directly DB mei save ho rha, agr kisi ke paas DB kaa access hoga to wo directly password read krr lega.. isliye hmlog Password ko Hash krr denge..

// hash the password..
        const hashedPassword = await bcrypt.hash(password, 12)

         // if user not registered, then save it in DB..
        await User.create({
            username,
            email,
            password: hashedPassword
        })

        // return res to client that you are successfully registered..
        return res.status(200).json({
            success: true,
            message: "You are successfully signedUp"
        })
    } catch (error) {
        console.log("error" , error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.."
        })
    }
}

// login
export const login = async (req,res) => {
    try {
        // fetch data from client..
        const {email , password } = req.body;

        //validation
        if(!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Please fill all the details"
            })
        }

        // if user gave all details.. then check user exist or not ..
        const isUser = await User.findOne({email});
        if(!isUser) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist, please signup first." 
            })
        }

        // pasword verification
        const isMatch = await bcrypt.compare(password, isUser.password)
        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: "Incorrect Password"
            })
        }

        // make token
        const token = jwt.sign({ id: isUser._id, email: isUser.email }, "a-string-secret-at-least-256-bits-long", {expiresIn: "3hr"})

        // if password is correct..
        // return res.status(200).json({
        //     success: true,
        //     message: "Logged in Successfully",
        //     token
        // });
           return res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000*60*5   // logged in for 5 min.

           })                          
           .json({
            success: true,
            message: "User Logged In."
           });

    } catch (error) {
        console.log("error is : " , error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// get profile details.
export const profileDetails = async (req,res) => {
    try {
        // agr aapko profile details chahiye to aapko pehle btana pdega ki aap kon hai ..
        // hmko userId chahiye hoga ..... wo kaise milega.. uske liye hmlog ek Middleware bnayenge .. 
        // fetch data from client..
        const userId = req.user.id;
        console.log("userId : " , userId);

        // validation
        if(!userId){
            return res.status(404).json({
                success: false,
                message: "userId not found"
            })
        }

        // agr user mil gya.. to hm uska sara detail fetch krr lenge..

        // fetch user from DB..
        const user = await User.findOne({_id: userId});
        // if user nhi mila to ..
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found."
            })
        }

        // or agr user DB mei mil gya to client ko res bhej denge..

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        })
    } catch (error) {
        console.log("error is : " , error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
  
//middleware.. -> ye middleware token ko verify krega or uske andr kaa detail nikalega. 
export const authMiddleware = async(req, res, next) => {
      try {
        // extract token.. -> client token ko add krr diya hai authorization mei jo ki header ke andr hota hai .. 

        // ye code line no-170 to 174 bs jwt token extract krne ke liye hai.. 
        // const authHeader = req.headers.authorization;
        // const token = authHeader.split(" ")[1];
        // console.log("authHeader" , authHeader);
        // console.log("token" , token);

        // Now extracting the cookie..
        const token = req.cookies.auth_token;
        console.log("token" , token);



         //  server token extract krr chuka hai ..
         // ab server token ko verify krega.
         // token verification.

         try {
            const decode = jwt.verify(token , "a-string-secret-at-least-256-bits-long") // ye token ko verify krr lega or sara payload ko decode krr lega ki ismei kya data hai..

            console.log("Payload Decode" , decode)


            // hm yaha req ke andr manually ek user naam ki key add krr rhe hai. or usmei pass krr diye decode ko. 
            
            // mtlb ki req.user mei . user ke andr jo token kaa credentials hai wo store krr diye. 

            //inshort user jo hai wo request mei information store krr ke bhej rha hai .

            req.user = decode;
            
            next();

         } catch (error) {
            return res.status(404).json({
                success: false,
                message: "Token is invalid.."
            });
         }

      } catch (error) {
        console.log("error is : " , error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
      }
}
