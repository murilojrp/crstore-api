
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import OrderItem from "../models/OrderItem";

const getAll = async (req, res) => {
  try {
    const order_items = await OrderItem.findAll();
    return res.status(200).send(order_items);
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

    let order_item = await OrderItem.findOne({
      where: {
        id
      }
    });

    if (!order_item) {
      return res.status(200).send({
        message: `No order_item found with the id ${id}`
      });
    }

    return res.status(200).send(order_item);
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
  let { price, amount, idItem, idOrder } = dados;

  let order_item = await OrderItem.create({
    price, 
    amount, 
    idItem, 
    idOrder
  });
  return res.status(201).send(order_item)
}

const update = async (id, dados, res) => {
  let { price, amount, idItem, idOrder } = dados;
  let order_item = await OrderItem.findOne({
    where: {
      id
    }
  });

  if (!order_item) {
    return res.status(200).send({ type: 'error', message: `No order_item found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => order_item[field] = dados[field]); 

  await order_item.save();
  return res.status(200).send({
    message: `Order_item ${id} successfully updated`,
    data: order_item
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete an order_item'
      });
    }

    let order_item = await OrderItem.findOne({
      where: {
        id
      }
    });

    if (!order_item) {
      return res.status(200).send({ message: `Order_item with the id ${id} not found` })
    }

    await order_item.destroy();
    return res.status(200).send({
      message: `Order_item id ${id} successfully deleted`
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