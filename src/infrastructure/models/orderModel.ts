// src/infrastructure/models/OrderModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../../config/database';

interface OrderAttributes {
  id_pedido: number;
  id_usuario: number;
  estado: string;
  fecha_pedido: Date;
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id_pedido'>;

class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id_pedido!: number;
  public id_usuario!: number;
  public estado!: string;
  public fecha_pedido!: Date;
}

OrderModel.init(
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'pedidos',
    timestamps: false,
  }
);

export default OrderModel;
