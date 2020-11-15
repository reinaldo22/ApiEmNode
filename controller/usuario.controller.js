import Usuario from '../model/Usuario';
import jwt from 'jsonwebtoken';
import config  from '../config';

export const signUp = async (req,res)=> {

    try {
    const {username, email, password, roles} = req.body;


    const newUser = new Usuario({
        username,
        email,
        password: await Usuario.encryptPassword(password),
    });


    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
};

export const signIn = async (req,res)=> {
    res.json('signin')
};