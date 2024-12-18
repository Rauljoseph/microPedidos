// src/interface/routes/orderRoutes.ts
import { Router } from 'express';
import SequelizeOrderRepository from '../../infrastructure/repositories/sequelizeOrderRepository'
import CreateOrderUseCase from '../../application/usecases/create_order_usecase';
import GetAllOrdersUseCase from '../../application/usecases/get_orders_usecase';
import OrderController from '../../infrastructure/controller/orderController';

const router = Router();

const orderRepository = new SequelizeOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const orderController = new OrderController(createOrderUseCase, getAllOrdersUseCase);
console.log("hola");


router.post('/orders', orderController.create);
router.get('/orders', orderController.getAll.bind(orderController));

export default router;
