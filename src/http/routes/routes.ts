import { Router } from "express";

// Controllers
import AuthenticationController from "../controllers/AuthenticationController";
import SurfboardController from "../controllers/SurfboardController";

const routes = Router();

// Authentication Routes
const authenticationController = new AuthenticationController();
routes.post(
  "/authentication/signin",
  authenticationController.authenticate.bind(authenticationController)
);

// Surfboard Routes
const surfboardController = new SurfboardController();
routes.get("/surfboard", surfboardController.findAll.bind(surfboardController));
routes.get(
  "/surfboard/:id",
  surfboardController.findById.bind(surfboardController)
);
routes.post("/surfboard", surfboardController.create.bind(surfboardController));
routes.put(
  "/surfboard/:id",
  surfboardController.update.bind(surfboardController)
);
routes.delete(
  "/surfboard/:id",
  surfboardController.remove.bind(surfboardController)
);

export default routes;
