
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Category from "../models/Category";

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).send(categories);
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

    let category = await Category.findOne({
      where: {
        id
      }
    });

    if (!category) {
      return res.status(200).send({
        message: `No category found with the id ${id}`
      });
    }

    return res.status(200).send(category);
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
  let { name } = dados;

  let categoryExists = await Category.findOne({
    where: {
      name
    }
  });

  if (categoryExists) {
    return res.status(200).send({
      message: 'There is already a category registered with that name'
    })
  }

  let category = await Category.create({
    name
  });
  return res.status(201).send(category)
}

const update = async (id, dados, res) => {
  let { name } = dados;
  let category = await Category.findOne({
    where: {
      id
    }
  });

  if (!category) {
    return res.status(200).send({ type: 'error', message: `No category found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => category[field] = dados[field]); 

  await category.save();
  return res.status(200).send({
    message: `Category ${id} successfully updated`,
    data: category
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete a category'
      });
    }

    let category = await Category.findOne({
      where: {
        id
      }
    });

    if (!category) {
      return res.status(200).send({ message: `Category with the id ${id} not found` })
    }

    await category.destroy();
    return res.status(200).send({
      message: `Category id ${id} successfully deleted`
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