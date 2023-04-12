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
exports.user_controllers = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
const utilities_1 = require("../utils/utilities");
const fileuploader_1 = require("../fileuploader");
const multer_1 = __importDefault(require("multer"));
let profileUpload = fileuploader_1.upload.single('profile');
exports.user_controllers = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        user_model_1.default.findOne({ email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email })
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            var _b, _c;
            console.log(data);
            const encodedPassowrd = yield (utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.encodePassword((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password));
            const newUser = new user_model_1.default(Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { password: encodedPassowrd }));
            (_c = newUser === null || newUser === void 0 ? void 0 : newUser.save()) === null || _c === void 0 ? void 0 : _c.then(data => {
                utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.send_Email(data === null || data === void 0 ? void 0 : data.email);
                res.status(201).send({ data: data, message: "User Register Successfuly" });
            }).catch((err) => {
                res.status(201).send({ data: null, message: err === null || err === void 0 ? void 0 : err.message });
            });
        })).catch((err) => {
            console.log(err);
            res.status(201).send({ data: null, message: err === null || err === void 0 ? void 0 : err.message });
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        user_model_1.default === null || user_model_1.default === void 0 ? void 0 : user_model_1.default.findOne({
            email: (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.email
        }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            var _e;
            const validateUser = yield (utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.validatePassword((_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.password, data === null || data === void 0 ? void 0 : data.password));
            if (validateUser) {
                const token = yield (utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.generateToken(data === null || data === void 0 ? void 0 : data.email));
                res.send({ message: "You are successfully Login", data: { data: data, token } });
            }
            else {
                res === null || res === void 0 ? void 0 : res.send({
                    message: "invalid credentials", data: null
                });
            }
        })).catch((err) => {
            res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
        });
        console.log(req === null || req === void 0 ? void 0 : req.body);
    }),
    updatePhoto: (req, res) => {
        profileUpload(req, res, function (err) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (err instanceof multer_1.default.MulterError) {
                    // A Multer error occurred when uploading
                    res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
                }
                else if (err) {
                    // An unknown error occurred when uploading.
                    res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
                }
                else {
                    (_a = utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.decodeToken(req === null || req === void 0 ? void 0 : req.headers['authorization'])) === null || _a === void 0 ? void 0 : _a.then(data => {
                        user_model_1.default === null || user_model_1.default === void 0 ? void 0 : user_model_1.default.findOneAndUpdate({ email: data === null || data === void 0 ? void 0 : data.data }, { profilePhoto: 'http://localhost:3000/uploads/a.png' }).then(data => {
                            res.status(200).send({ message: "Image Uploaded Successfully", data: data });
                        }).catch(err => {
                            res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
                        });
                    }).catch(err => {
                        res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
                    });
                }
            });
        });
        // Everything went fine.
        console.log(req === null || req === void 0 ? void 0 : req.body);
    },
    socialLogin: (req, res) => {
        console.log(req === null || req === void 0 ? void 0 : req.body);
    },
    updateProfile: (req, res) => {
        var _a;
        (_a = utilities_1.utilities === null || utilities_1.utilities === void 0 ? void 0 : utilities_1.utilities.decodeToken(req === null || req === void 0 ? void 0 : req.headers['authorization'])) === null || _a === void 0 ? void 0 : _a.then(data => {
            user_model_1.default === null || user_model_1.default === void 0 ? void 0 : user_model_1.default.findOneAndUpdate({ email: data === null || data === void 0 ? void 0 : data.data }, Object.assign({}, req === null || req === void 0 ? void 0 : req.body)).then(data => {
                res.status(200).send({ message: "Profile Uploaded Successfully", data: data });
            }).catch(err => {
                res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
            });
        }).catch(err => {
            res.status(200).send({ message: err === null || err === void 0 ? void 0 : err.message, data: null });
        });
    }
};
//# sourceMappingURL=user.js.map