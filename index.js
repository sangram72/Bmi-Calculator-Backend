const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const otpGenerator = require('otp-generator')
var cors = require("cors");

const app = express();
app.use(cors());


app.use(bodyParser.json());

let otpverification;

app.post("/verifyotp",async(req,res)=>{
    
    otpverification=req.body;
 console.log("getting otp",otpverification)

   if(hexOtp==otpverification.hexOtp){
    return res.status(200).json({status:'true'})
}else if(otp!=otpverification){
    return res.status(404).json({status:'false'})
}
})
let otp="";

let  hexOtp = '';  
app.post("/sendemail", async (req, res) => {

    const { email } = req.body;
    otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    hexOtp = '';    
    for (let i = 0; i < otp.length; i++) {
        hexOtp += otp.charCodeAt(i).toString(16);
    }

  

    if (!email) {
        return res.status(400).send("Email is required");

    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'sangramnandi72@gmail.com', pass: 'frhmosuzyunkbjob' }
        });

        const info = await transporter.sendMail({
            from: "Bmicalculatorteam",
            to: email,
            subject: "Verify Your Email",
      
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
                <div style="background-color: #f7f7f7; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                   
                    <h2 style="color: #4CAF50;">Verify Your Email</h2>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Welcome! Please use the OTP below to verify your email and secure your account.
                    </p>
                    <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #4CAF50;">
                        ${otp}
                    </div>
                    <p style="font-size: 14px; margin-top: 20px;">
                        If you did not request this, please ignore this email.
                    </p>
                    <a href="https://bmi-calculator-lac-mu.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Visit our Website</a>
                </div>
            </div>
            `
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Email sent successfully",OTP:hexOtp });
       
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "An error occurred while sending email" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
