import { Response, Request } from "express"
import User from "../Models/user.model"
import { utilities } from "../utils/utilities"

import { upload } from "../fileuploader"
import multer from 'multer'
let profileUpload = upload.single('profile')

export const user_controllers = {
    register: async (req: Request, res: Response) => {
        User.findOne({ email: req?.body?.email })
            .then(async (data: any) => {
                console.log(data)
                const encodedPassowrd = await utilities?.encodePassword(req?.body?.password)
                const newUser = new User({ ...req?.body, password: encodedPassowrd })
                newUser?.save()?.then(data => {
                    utilities?.send_Email(data?.email)
                    res.status(201).send({ data: data, message: "User Register Successfuly" })
                }).catch((err: any) => {
                    res.status(201).send({ data: null, message: err?.message })
                })


            }).catch((err: any) => {
                console.log(err)
                res.status(201).send({ data: null, message: err?.message })
            })


    },
    login: async (req: Request, res: Response) => {
        User?.findOne({
            email: req?.body?.email
        }).then(async (data: any) => {
            const validateUser = await utilities?.validatePassword(req?.body?.password, data?.password)
            if (validateUser) {
                const token = await utilities?.generateToken(data?.email)
                res.send({ message: "You are successfully Login", data: { data: data, token } })
            }
            else {
                res?.send({
                    message: "invalid credentials", data: null
                })
            }

        }).catch((err: any) => {
            res.status(200).send({ message: err?.message, data: null })
        })
        console.log(req?.body)
    },
    updatePhoto: (req: Request, res: Response) => {
        profileUpload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading
                res.status(200).send({ message: err?.message, data: null })
            } else if (err) {
                // An unknown error occurred when uploading.
                res.status(200).send({ message: err?.message, data: null })
            }
            else {
                utilities?.decodeToken(req?.headers['authorization'])?.then(data => {
                    User?.findOneAndUpdate({ email: data?.data }, { profilePhoto: 'http://localhost:3000/uploads/a.png' }).then(data => {
                        res.status(200).send({ message: "Image Uploaded Successfully", data: data })
                    }).catch(err => {
                        res.status(200).send({ message: err?.message, data: null })
                    })

                })
                    .catch(err => {
                        res.status(200).send({ message: err?.message, data: null })
                    })

            }
        })
    },
    socialLogin: (req: Request, res: Response) => {
        console.log(req?.body)
    },
    updateProfile: (req: Request, res: Response) => {
        utilities?.decodeToken(req?.headers['authorization'])?.then(data => {
            User?.findOneAndUpdate({ email: data?.data }, { ...req?.body }).then(data => {
                res.status(200).send({ message: "Profile Uploaded Successfully", data: data })
            }).catch(err => {
                res.status(200).send({ message: err?.message, data: null })
            })

        })
            .catch(err => {
                res.status(200).send({ message: err?.message, data: null })
            })
    },
    updatePassword: (req: Request, res: Response) => {
        utilities?.decodeToken(req?.headers['authorization'])?.then(data => {
            User?.findOneAndUpdate({ email: data?.data }, { ...req?.body }).then(data => {
                res.status(200).send({ message: "Password Updated Successfully", data: data })
            }).catch(err => {
                res.status(200).send({ message: err?.message, data: null })
            })

        })
            .catch(err => {
                res.status(200).send({ message: err?.message, data: null })
            })

    }
}