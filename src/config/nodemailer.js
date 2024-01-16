import nodemailer from 'nodemailer';
import 'dotenv/config'


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mozetichcristian@gmail.com',
        pass: process.env.PASS_EMAIL,
        authMethod: 'LOGIN'
    },
    // Opcional: Asegúrate de especificar correctamente el protocolo de autenticación si es necesario
    // El método predeterminado es 'login', puedes usar 'login' o 'oauth2'
    tls:{
        rejectUnauthorized: false,
    }// Si es necesario; sino, se manejará por defecto
});


export const sendRecoveryMail = (email, recoveryLink) => {
    const mailOptions = {
        from: 'mozetichcristian@gmail.com',
        to: email,
        subject: 'Link para restablecer su contraseña',
        text: `Haga click en el siguiente enlace para restablecer su contraseña ${recoveryLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado correctamente');
        }
    });
};

export const sendInactiveUserEmail = (email) => {
    const mailOptions = {
        from: 'mozetichcristian@gmail.com',
        to: email,
        subject: 'Automatic Logout Notification',
        text: 'Dear User,\n\nYou have been automatically logged out due to inactivity.\n\nIf you have any questions, please log in again.\n\nThank you.'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Inactive user logout notification email sent successfully');
        }
      });
}

