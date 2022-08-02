
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Order from "../models/Order";

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
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

    let order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res.status(200).send({
        message: `No order found with the id ${id}`
      });
    }

    return res.status(200).send(order);
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
  }
}

const persist = async (req, res) => {
  try {
    let { id } = req.params;
    //caso nao tenha id, cria um novo registro
    if (!id) {
      return await create(req.body, res)
    }

    return await update(id, req.body, res)
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  let { total_price, id_user, id_discount_coupon, id_deliveryman, id_payment } = dados;

  let order = await Order.create({
    total_price, 
    id_user, 
    id_discount_coupon, 
    id_deliveryman, 
    id_payment
  });
  return res.status(201).send(order)
}

const update = async (id, dados, res) => {
  let { total_price, id_user, id_discount_coupon, id_deliveryman, id_payment } = dados;
  let order = await Order.findOne({
    where: {
      id
    }
  });

  if (!order) {
    return res.status(200).send({ type: 'error', message: `No order found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => order[field] = dados[field]); 

  await order.save();
  return res.status(200).send({
    message: `Order ${id} successfully updated`,
    data: order
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete an order'
      });
    }

    let order = await Order.findOne({
      where: {
        id
      }
    });

    if (!order) {
      return res.status(200).send({ message: `Order with the id ${id} not found` })
    }

    await order.destroy();
    return res.status(200).send({
      message: `Order id ${id} successfully deleted`
    })
  } catch (error) {
    return res.status(200).send({
      message: error.message
    })
  }
}

export default {
  getAll,
  getById,
  persist,
  destroy
}; 