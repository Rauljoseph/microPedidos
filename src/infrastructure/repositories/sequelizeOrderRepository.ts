// src/infrastructure/repositories/SequelizeOrderRepository.ts
import { OrderRepository } from '../../domain/repository/order_repository';
import Order from '../../domain/entity/order';
import OrderModel from '../models/orderModel';

export default class SequelizeOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order> {
    const createdOrder = await OrderModel.create({
        id_usuario: order.id_usuario,
        estado: order.estado,
        fecha_pedido: order.fecha_pedido,
      });
    
      return new Order(
        createdOrder.id_pedido,
        createdOrder.id_usuario,
        createdOrder.estado,
        createdOrder.fecha_pedido
      );
  }

  async findById(id_pedido: number): Promise<Order | null> {
    const order = await OrderModel.findByPk(id_pedido);
    if (!order) return null;
    return new Order(order.id_pedido, order.id_usuario, order.estado, order.fecha_pedido);
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll();
    return orders.map(
      (order) => new Order(order.id_pedido, order.id_usuario, order.estado, order.fecha_pedido)
    );
  }
}


export const updateOrderStatus= async  (id_pedido: number, nuevoEstado: string) => {
  try {
    const pedido = await OrderModel.findByPk(id_pedido); 
    if (pedido) {
      pedido.estado = nuevoEstado; 
      await pedido.save();
      console.log(`Pedido ${id_pedido} actualizado en la base de datos`);
    } else {
      console.error(`Pedido ${id_pedido} no encontrado`);
    }
  } catch (error) {
  throw new Error("No se pudo actualizar el estado del pedido")
  }
};