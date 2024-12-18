// src/main.ts
import express from "express";
import sequelize from "../config/database";
import orderRoutes from "./infrastructure/routes/orderRoutes";
// import dotenv from 'dotenv';
import { log } from "console";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", orderRoutes);
console.log('Rutas cargadas correctamente');

const PORT = process.env.PORT_APPLICATION || 3000;

// app.listen(PORT, () => {
//   console.log("server listening on port", PORT);
// });

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
