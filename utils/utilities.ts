import jwt from 'jsonwebtoken'
import Sendgrid from '@sendgrid/mail'
import bcrypt from 'bcrypt'
import { Send_Grid_API } from '../config-variable';
export const utilities = {
    encodePassword: async (pass: string) => {
        const hash = await bcrypt.hash(pass, 10);
        return hash
    },
    validatePassword: async (pass: string, hash: string) => {
        const result = await bcrypt.compare(pass, hash);
        return result;
    },
    generateToken: async (email: string) => {
        const token = await jwt.sign({
            data: email
        }, 'zoho-manager', { expiresIn: 60 });
        return token
    },
    decodeToken: async (token: any) => {
        console.log(token)
        var decoded = jwt.verify(token, 'zoho-manager');
        return decoded
    },
    send_Email: async (email: string) => {
        Sendgrid.setApiKey(Send_Grid_API)
        const msg = {
            to: email, // Change to your recipient
            from: 'awaisniaz47@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        Sendgrid
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    }
}