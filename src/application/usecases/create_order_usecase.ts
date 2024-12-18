// src/application/CreateOrderUseCase.ts
import Order from '../../domain/entity/order'
import { OrderRepository } from '../../domain/repository/order_repository';

export default class CreateOrderUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderData: { id_usuario: number; estado: string }): Promise<Order> {
    const order = new Order(null, orderData.id_usuario, orderData.estado);
    return await this.orderRepository.create(order);
  }
}
