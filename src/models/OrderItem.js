import { DataTypes } from "sequelize";
import { sequelize } from "../config";
import Order from "./Order";
import Item  from "./Item";

const OrderItem = sequelize.define(
  'order_items',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
        type: DataTypes.NUMERIC(15,2),
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

OrderItem.belongsTo(Item, {
    as: 'item',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idItem',
        allowNull: false,
        field: 'id_item'
    }
});

OrderItem.belongsTo(Order, {
    as: 'order',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    foreignKey: {
        name: 'idOrder',
        allowNull: false,
        field: 'id_order'
    }
});

export default OrderItem;
