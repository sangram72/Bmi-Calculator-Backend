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


   if(otp==otpverification.otpss){
    return res.status(200).json({status:'true'})
}else if(otp!=otpverification){
    return res.status(404).json({status:'false'})
}
})
let otp="";
app.post("/sendemail", async (req, res) => {

    const { email } = req.body;
    otp= otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
   

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
      
            html: `<b>Kindly Use this " ${otp} " OTP to Secure Your Account</b>`,
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({ message: "Email sent successfully",OTP:otp });
       
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "An error occurred while sending email" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
