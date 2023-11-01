const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  service: "Gmail",
  auth: {
    user: "bhanusharma252001@gmail.com", // generated ethereal user
    pass: "utdl cjen wgad chau", // generated ethereal password
  },
});

exports.sendOtp = async (data) => {
    console.log("data",data);
  try {
    let info = await transporter.sendMail({
      from: "bhanusharma252001@gmail.com", // sender address
      to: data.toEmail, // sender address
      subject: " OTP - story application", // Subject line
      text: " ", // plain text body
      html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.1/css/all.min.css" />
        </head>
        
        <body>
        <center> <h1> Thank you for sign up </h1> <br> <h2>OTP : ${data.otp}</h2>  </center>
        
        

            </table>
        </body>
        
        </html>`,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};
