import { Request, Response } from "express";
import CreateOrderUseCase from "../../application/usecases/create_order_usecase";
import GetAllOrdersUseCase from "../../application/usecases/get_orders_usecase";
import { findUserById } from "../models/tableCache";
import OrderModel from "../models/orderModel";
type ErrorResponse = {
  error: string;
};

export default class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase
  ) {}

  async create(req: Request, res: Response):Promise<void> {
    try {
      const { id_usuario} = req.body;
      
      const userExists = await findUserById(id_usuario);
      if (!userExists) {
         res.status(400).json({ error: 'Usuario no válido' });
         return 
      }
      const order = await this.createOrderUseCase.execute(req.body);
      res.status(201).json({ message: 'Pedido creado', order: order });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
      // throw new Error("no se puedo hacer el pedido");
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.getAllOrdersUseCase.execute(); // Sin argumentos
       res.status(200).json(orders);
    } catch (error) {
      if (error instanceof Error) {
        console.log("este es ele rror", error);

       res.status(500).json({ error: error.message });
      } else {
       res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  }

  

  
}
