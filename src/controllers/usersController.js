import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAll = async (req, res) => {
  try {
    const response = await User.findAll({
      order: [['id', 'ASC']]
    });
    return res.status(200).send({
      type: 'success', // success, error, warning, info
      message: 'Registros recuperados com sucesso', // mensagem para o front exibir
      data: response // json com informações de resposta
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error
    });
  }
}

const register = async (req, res) => {
  try {
    let { username, name, phone, password, role } = req.body;

    let userExists = await User.findOne({
      where: {
        username
      }
    });

    if (userExists) {
      return res.status(200).send({
        type: 'error',
        message: 'Já existe um usuário cadastrado com esse username!'
      });
    }

    let passwordHash = await bcrypt.hash(password, 10);

    let response = await User.create({
      username,
      name,
      phone,
      passwordHash,
      role
    });

    return res.status(200).send({
      type: 'success',
      message: 'Usuário cadastrastado com sucesso!',
      data: response
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error.message
    });
  }
}

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({
      where: {
        username
      }
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(200).send({
        type: 'error',
        message: 'Usuário ou senha incorretos!'
      });
    }

    let token = jwt.sign(
      { userId: user.id, username: user.username }, //payload - dados utilizados na criacao do token
      process.env.TOKEN_KEY, //chave PRIVADA da aplicação 
      { expiresIn: '1h' } //options ... em quanto tempo ele expira...
    );

    user.token = token;
    await user.save();

    return res.status(200).send({
      type: 'success',
      message: 'Bem-vindo! Login realizado com sucesso!',
      token
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro!',
      data: error
    });
  }
}

export default {
  getAll,
  register,
  login
}