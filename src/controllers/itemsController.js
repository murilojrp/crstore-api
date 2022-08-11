
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Item from "../models/Item";

const getAll = async (req, res) => {
  try {
    const items = await Item.findAll({
      include: ['category']
    });
    return res.status(200).send({
      type: 'success',
      message: 'Deu Boa',
      data: items
    });
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

    let item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res.status(200).send({
        message: `No item found with the id ${id}`
      });
    }

    return res.status(200).send(item);
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
  let { name, price, idCategory, image } = dados;

  let item = await Item.create({
    name, 
    price,
    idCategory,
    image
  });
  return res.status(201).send(item)
}

const update = async (id, dados, res) => {
  let { name, price, idCategory, image } = dados;
  let item = await Item.findOne({
    where: {
      id
    }
  });

  if (!item) {
    return res.status(200).send({ type: 'error', message: `No item found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => item[field] = dados[field]); 

  await item.save();
  return res.status(200).send({
    message: `Item ${id} successfully updated`,
    data: item
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete an item'
      });
    }

    let item = await Item.findOne({
      where: {
        id
      }
    });

    if (!item) {
      return res.status(200).send({ message: `Item with the id ${id} not found` })
    }

    await item.destroy();
    return res.status(200).send({
      message: `Item id ${id} successfully deleted`
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