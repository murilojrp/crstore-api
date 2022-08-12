
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Cart from "../models/Cart";
import usersController from "./usersController";

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }

    if (!id) {
      let response = await Cart.findAll({ include: ['item'], where: { idUser: user.id } });

      

      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response 
      });
    };

    let response = await Cart.findOne({ where: { id, idUser: user.id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [] 
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message 
    });
  }
}

const getById = async (req, res) => {
  try {
    let { id } = req.params;

    //garante que o id só vai ter NUMEROS;
    id = id.replace(/\D/g, '');
    if (!id) {
      return res.status(200).send({
        message: 'Please enter a valid id for query'
      });
    }

    let cart = await Cart.findOne({
      where: {
        id
      }
    });

    if (!cart) {
      return res.status(200).send({
        message: `No cart found with the id ${id}`
      });
    }

    return res.status(200).send(cart);
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
  }
}
const persist = async (req, res) => {
  let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
  let user = await usersController.getUserByToken(req.headers.authorization);
  if (!JSON.stringify(user)) {
    return res.status(200).send({
      type: 'error',
      message: 'Ocorreu um erro ao recuperar os seus dados'
    })
  }
  
  let idUser = JSON.stringify(user.id);

  let { idItem, amount, price } = req.body;

  let itemAlreadyOnCart = await Cart.findOne({
    where: {
      idUser,
      idItem,
      price,
    }
  })
  
  if (itemAlreadyOnCart) {
    amount = Number(amount);
    amount += Number(itemAlreadyOnCart.amount);
    let updateOfTheItem = {
      idItem,
      amount,
      price
    }
    return await update(itemAlreadyOnCart.id, updateOfTheItem, res, user)
  }


  try {
    if (!id) {
      return await create(req.body, res, user)
    }
    return await update(id, req.body, res, user)
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error
    });
  }
}

const create = async (dados, res, user) => {
  let { idItem, amount, price} = dados;
  let response = await Cart.create({
    idUser: user.id,
    idItem,
    amount,
    price
  });

  return res.status(200).send({
    type: 'success',
    message: `Cadastro realizado com sucesso`,
    data: response 
  });
}

const update = async (id, dados, res, user) => {
  let cart = await Cart.findOne({ where: { id, idUser: user.id } });

  if (!cart) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [] 
    });
  }
  //update dos campos
  Object.keys(dados).forEach(field => cart[field] = dados[field]); 

  await cart.save();
  return res.status(200).send({
    message: `Cart ${id} successfully updated`,
    data: cart
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete a cart'
      });
    }

    let cart = await Cart.findOne({
      where: {
        id
      }
    });

    if (!cart) {
      return res.status(200).send({ message: `Cart with the id ${id} not found` })
    }

    await cart.destroy();
    return res.status(200).send({
      message: `Cart id ${id} successfully deleted`
    })
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
  }
}

export default {
  get,
  getById,
  persist,
  destroy
}; 