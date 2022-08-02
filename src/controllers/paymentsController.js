
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Payment from "../models/Payment";

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    return res.status(200).send(payments);
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

    let payment = await Payment.findOne({
      where: {
        id
      }
    });

    if (!payment) {
      return res.status(200).send({
        message: `No payment found with the id ${id}`
      });
    }

    return res.status(200).send(payment);
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
  let { method } = dados;

  let paymentExists = await Payment.findOne({
    where: {
      method
    }
  });

  if (paymentExists) {
    return res.status(200).send({
      message: 'There is already a payment registered with that method of payment'
    })
  }

  let payment = await Payment.create({
    method
  });
  return res.status(201).send(payment)
}

const update = async (id, dados, res) => {
  let { method } = dados;
  let payment = await Payment.findOne({
    where: {
      id
    }
  });

  if (!payment) {
    return res.status(200).send({ type: 'error', message: `No payment found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => payment[field] = dados[field]); 

  await payment.save();
  return res.status(200).send({
    message: `Payment ${id} successfully updated`,
    data: payment
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete a way of payment'
      });
    }

    let payment = await Payment.findOne({
      where: {
        id
      }
    });

    if (!payment) {
      return res.status(200).send({ message: `Payment with the id ${id} not found` })
    }

    await payment.destroy();
    return res.status(200).send({
      message: `Payment id ${id} successfully deleted`
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