"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_schema = new mongoose_1.default.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        immutable: true
    },
    password: {
        type: String
    },
    profilePhoto: {
        type: String
    }
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', User_schema);
exports.default = User;
//# sourceMappingURL=user.model.js.map