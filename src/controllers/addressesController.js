
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Address from "../models/Address";

const getAll = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    return res.status(200).send(addresses);
  } catch (error) {
    return res.status(500).send({
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
      return res.status(400).send({
        message: 'Please enter a valid id for query'
      });
    }

    let address = await Address.findOne({
      where: {
        id
      }
    });

    if (!address) {
      return res.status(400).send({
        message: `No address found with the id ${id}`
      });
    }

    return res.status(200).send(address);
  } catch (error) {
    return res.status(500).send({
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
    return res.status(500).send({
      message: error.message
    })
  }
}

const create = async (dados, res) => {
  let { street, neighborhood, number, complement, address } = dados;

  let addressCreate = await Address.create({
    street, 
    neighborhood, 
    number, 
    complement, 
    address
  });
  return res.status(201).send(addressCreate)
}

const update = async (id, dados, res) => {
  let { street, neighborhood, number, complement, address } = dados;
  let addressUpdate = await Address.findOne({
    where: {
      id
    }
  });

  if (!addressUpdate) {
    return res.status(400).send({ type: 'error', message: `No address found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => address[field] = dados[field]); 

  await address.save();
  return res.status(200).send({
    message: `Address ${id} successfully updated`,
    data: address
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(400).send({
        message: 'Enter a valid id to delete an address'
      });
    }

    let address = await Address.findOne({
      where: {
        id
      }
    });

    if (!address) {
      return res.status(400).send({ message: `Address with the id ${id} not found` })
    }

    await address.destroy();
    return res.status(200).send({
      message: `Address id ${id} successfully deleted`
    })
  } catch (error) {
    return res.status(500).send({
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