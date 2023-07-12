const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

userRouter.get("/", usersController.get);
userRouter.post("/", usersController.create);
userRouter.put("/", ensureAuthenticated, usersController.update);
userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = userRouter;
