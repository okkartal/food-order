import express from "express";
import multer from "multer";
import restaurantController from "../controllers/restaurantController";
import { jwtMiddleware } from "../middlewares/auth";
import { validateRestaurantRequest } from "../middlewares/validation";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get(
  "/order",
  jwtMiddleware,
  restaurantController.getMyRestaurant as any
);

router.patch(
  "/order/:orderId/status",
  param("restaurantId").isMongoId(),
  restaurantController.updateOrderStatus as any
);

router.get("/", jwtMiddleware, restaurantController.getMyRestaurant as any);

router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest as any,
  jwtMiddleware,
  restaurantController.createRestaurant as any
);

router.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest as any,
  jwtMiddleware,
  restaurantController.updateRestaurant as any
);

router.get(
  "/:restaurantId",
  param("restaurantId").isMongoId().withMessage("Restaurant ID is invalid"),
  restaurantController.getRestaurant as any
);

router.get(
  "/search/:city",
  param("city").isString().trim().notEmpty().withMessage("City is required"),
  restaurantController.searchRestaurant as any
);

export default router;
