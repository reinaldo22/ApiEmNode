import Usuario from '../model/Usuario';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../model/Role';


//Verifica se existe um token passando no cabeçalho da requisicao
//cria regras específicas de moderador e administrador
export const verifyToken = async(req, res, next) =>{

   try {

    const token = req.headers["x-access-token"];

   
    // se caso não seja passado nenhum token na header
    if(!token) return res.status(403).json({message: "Não possui um token!"})

    //verifica o token passado
    const decode = jwt.verify(token, config.SECRET);
    req.userId = decode.id;
   // console.log(">>>>>>>>token referente a meu usuário>>>>>>>>>>"+ req.userId);
    //verifica se o usuário é válido
    const user = await Usuario.findById(req.userId, {password: 0});
    if(!user ) return res.status(404).json({message: "usuário não encontrado"});
    next();

   } catch (error) {
     return res.status(401).json({message: "Não autorizado!"});  
   }

  };

  export const isModerator = async(req, res, next) => {

    const user = await Usuario.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i = 0; i < roles.length; i++){
      if(roles[i].name === "moderator"){
        next()
        return;
      }
   
    }
    return res.status(403).json({message: "Usuário não tem permissão de moderador"});
  };
  export const isAdmin = async(req, res, next) => {

    const user = await Usuario.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    for(let i = 0; i < roles.length; i++){
      if(roles[i].name === "admin"){
        next()
        return;
      }
   
    }
    return res.status(403).json({message: "Usuário não tem permissão de administrador"});
  };