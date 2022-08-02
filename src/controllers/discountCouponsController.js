
//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import DiscountCoupon from "../models/DiscountCoupon";

const getAll = async (req, res) => {
  try {
    const discount_coupons = await DiscountCoupon.findAll();
    return res.status(200).send(discount_coupons);
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

    let discount_coupon = await DiscountCoupon.findOne({
      where: {
        id
      }
    });

    if (!discount_coupon) {
      return res.status(200).send({
        message: `No discount coupon found with the id ${id}`
      });
    }

    return res.status(200).send(discount_coupon);
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
  let { coupon, discount } = dados;

  let discountCoupon = await DiscountCoupon.create({
    coupon,
    discount
  });
  return res.status(201).send(discountCoupon)
}

const update = async (id, dados, res) => {
  let { coupon, discount } = dados;
  let discountCoupon = await DiscountCoupon.findOne({
    where: {
      id
    }
  });

  if (!discountCoupon) {
    return res.status(200).send({ type: 'error', message: `No discount coupon found with the id ${id}` })
  }

  //update dos campos
  Object.keys(dados).forEach(field => discountCoupon[field] = dados[field]); 

  await discountCoupon.save();
  return res.status(200).send({
    message: `Discount coupon ${id} successfully updated`,
    data: discountCoupon
  });
}

const destroy = async (req, res) => {
  try {
    let { id } = req.body;
    //garante que o id só vai ter NUMEROS;
    id = id ? id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        message: 'Enter a valid id to delete a discount coupon'
      });
    }

    let discountCoupon = await DiscountCoupon.findOne({
      where: {
        id
      }
    });

    if (!discountCoupon) {
      return res.status(200).send({ message: `Discount coupon with the id ${id} not found` })
    }

    await discountCoupon.destroy();
    return res.status(200).send({
      message: `Discount coupon id ${id} successfully deleted`
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