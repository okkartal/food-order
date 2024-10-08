import express from "express";
import { jwtMiddleware } from "../middlewares/auth";
import userController from "../controllers/userController";
import { validateUserRequest } from "../middlewares/validation";

const router = express.Router();

router.get("/", jwtMiddleware, userController.getCurrentUser as any);
router.post(
  "/",
  jwtMiddleware,
  validateUserRequest as any,
  userController.createCurrentUser as any
);
router.put(
  "/",
  jwtMiddleware,
  validateUserRequest as any,
  userController.updateCurrentUser as any
);

export default router;
