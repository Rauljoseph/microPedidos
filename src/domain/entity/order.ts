// src/domain/entities/Order.ts
export default class Order {
    constructor(
      public readonly id_pedido: number | null,
      public id_usuario: number,
      public estado: string,
      public fecha_pedido: Date = new Date()
    ) {}
  }
  