"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilities = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_variable_1 = require("../config-variable");
exports.utilities = {
    encodePassword: (pass) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = yield bcrypt_1.default.hash(pass, 10);
        return hash;
    }),
    validatePassword: (pass, hash) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield bcrypt_1.default.compare(pass, hash);
        return result;
    }),
    generateToken: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield jsonwebtoken_1.default.sign({
            data: email
        }, 'zoho-manager', { expiresIn: 60 });
        return token;
    }),
    decodeToken: (token) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(token);
        var decoded = jsonwebtoken_1.default.verify(token, 'zoho-manager');
        return decoded;
    }),
    send_Email: (email) => __awaiter(void 0, void 0, void 0, function* () {
        mail_1.default.setApiKey(config_variable_1.Send_Grid_API);
        const msg = {
            to: email,
            from: 'awaisniaz47@gmail.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        mail_1.default
            .send(msg)
            .then(() => {
            console.log('Email sent');
        })
            .catch((error) => {
            console.error(error);
        });
    })
};
//# sourceMappingURL=utilities.js.map