import express from 'express';
import { user_controllers } from '../controller/user';

const userrouters = express.Router()
userrouters.post('/login', user_controllers?.login)
userrouters.get('/login', user_controllers?.login)
userrouters.post('/socialLogin', user_controllers?.socialLogin)
userrouters.put('/updateProfile', user_controllers?.updateProfile)
userrouters.put('/updatePhoto', user_controllers?.updatePhoto)
userrouters.post('/signup', user_controllers?.register)

export default userrouters