// src/domain/repositories/OrderRepository.ts
import Order from "../entity/order"

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id_pedido: number): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
