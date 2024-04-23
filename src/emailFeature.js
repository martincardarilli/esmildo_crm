
import nodemailer from 'nodemailer';

async function startEmailFeature() {
    console.log("Email feature is running");
    // Cualquier lógica adicional que inicie la funcionalidad del correo electrónico.

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "35b72bf5a87ae0",
            pass: "e8b72c6eea3cc9"
        }
    });

    let info = await transporter.sendMail({
        from: '"FaztTech Server" <lohse.agustin@gmail.com>', // sender address,
        to: 'test-6lb31wjai@srv1.mail-tester.com',
        subject: 'Website Contact Form',
        text: 'Hello World'
        // html: contentHTML
    })

    console.log(info);
}

export default startEmailFeature;






