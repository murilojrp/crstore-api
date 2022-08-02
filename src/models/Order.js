import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import DiscountCoupon from "./DiscountCoupon";
import User from "./User";
import Payment from "./Payment"

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    totalPrice: {
        type: DataTypes.NUMERIC(15,2),
        allowNull: false,
        field: "total_price"
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Order.belongsTo(User, {
    as: 'user',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idUser',
        allowNull: false,
        field: 'id_user'
    }
});

Order.belongsTo(DiscountCoupon, {
    as: 'discountcoupon',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idDiscountCoupon',
        allowNull: true,
        field: 'id_discount_coupon'
    }
});

Order.belongsTo(User, {
    as: 'deliveryman',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idDeliveryman',
        allowNull: false,
        field: 'id_deliveryman'
    }
});

Order.belongsTo(Payment, {
    as: 'payment',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idPayment',
        allowNull: false,
        field: 'id_payment'
    }
});

export default Order;
