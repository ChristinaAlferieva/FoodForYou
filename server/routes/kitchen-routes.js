import express from 'express';
import { getAllKitchens, addKitchen, updateKitchen, getById, deleteKitchen, getByUserId } from '../controllers/kitchen-controller.js';

const kitchenRouter = express.Router();

kitchenRouter.get("/", getAllKitchens);
kitchenRouter.post("/add", addKitchen);
kitchenRouter.put('/update/:id', updateKitchen);
kitchenRouter.get("/:id", getById);
kitchenRouter.delete("/:id", deleteKitchen);
kitchenRouter.get('/user/:id', getByUserId);

export default kitchenRouter;