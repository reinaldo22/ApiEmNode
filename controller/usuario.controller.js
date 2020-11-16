import Usuario from '../model/Usuario';
import jwt from 'jsonwebtoken';
import config  from '../config';
import Role from '../model/Role';

export const signUp = async (req,res)=> {

    try {
    const {
            username,
            email,
            password,
            roles
        } = req.body;


    const newUser = new Usuario({
        username,
        email,
        password: await Usuario.encryptPassword(password),
    });

    //Se encontrar um role específico me retornae
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role =>role._id)
    }else{
      const role = await Role.findOne({name: "user"})
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);
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
    const userFound = await Usuario.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.status(400).json({message: "Usuário não encontrado!"});

    const matchPassword = await Usuario.comparePassword(req.body.password, userFound.password);
    if(!matchPassword) return res.status(401).json({token: null, message:"senha inválida"});

    const token  = jwt.sign({id:userFound._id}, config.SECRET, {
      expiresIn: 86400
    });

    res.json({token});
  };