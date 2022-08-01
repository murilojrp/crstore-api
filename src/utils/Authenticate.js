import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(200).send({
        type: 'error',
        message: 'Token não informado'
      })
    }

    const token = authorization.split(' ')[1] || null;
    const decodedToken = jwt.decode(token);
    
    if (!decodedToken) {
      return res.status(200).send({
        type: 'error',
        message: 'Você não tem permissão para acessar esse recurso!'
      })
    }

    if (decodedToken.exp < (Date.now() / 1000)) {
      return res.status(200).send({
        type: 'error',
        message: 'Sua sessão expirou! Faça login novamente'
      })
    }

    let onlyAdminPaths = [
      '/items/destroy',
      '/items/persist'
    ];

    const user = await User.findOne({
      where: {
        id: decodedToken.userId
      }
    })

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Usuário não encontrado'
      })
    }

    if (onlyAdminPaths.includes(req.route.path) && user.role !== 'admin') {
      return res.status(200).send({
        type: 'error',
        message: 'Você não tem permissão para acessar esse recurso!'
      })
    }

    return next();
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ocorreu um problema!'
    })
  }
};