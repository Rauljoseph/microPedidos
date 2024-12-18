// src/application/usecases/get_orders_usecase.ts
import Order from '../../domain/entity/order';
import { OrderRepository } from '../../domain/repository/order_repository';

export default class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
