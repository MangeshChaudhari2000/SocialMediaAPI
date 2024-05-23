import nodemailer from 'nodemailer';

export const sendMail = async (otp, receiverMailId) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "mvchaudhari2000@gmail.com",
            pass: 'ifqlrjpwzcoyjnvj'     //app password
        },
    });

    const maildetail = {
        from: 'mvchaudhari2000@gmail.com', // sender address
        to: `${receiverMailId}`, // list of receivers
        subject: "One Time Authentication from PostAway2", // Subject line
        html: `<div>
        <b style="color: brown; font-size: large">Postaway 2</b>
        <p>Your One TimePassword is ${otp}</p>

        <p>Be like an OTP so that no one can use you twice</p>
      </div>
      `, // html body
    }

    try {
        const result = await transporter.sendMail(maildetail)
        return result;
        console.log("Email sent successfully");
    } catch (error) {
        console.log('email failed with error' + error);
    }
}