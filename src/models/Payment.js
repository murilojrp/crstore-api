import { DataTypes } from "sequelize";
import { sequelize } from "../config";

const Payment = sequelize.define(
  'payments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    method: {
        type: DataTypes.STRING(100),
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

export default Payment;
