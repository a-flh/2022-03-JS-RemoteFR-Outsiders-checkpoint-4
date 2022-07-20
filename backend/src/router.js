const express = require("express");

const {
  ItemController,
  UserController,
  MovieController,
} = require("./controllers");

const router = express.Router();

router.get("/items", ItemController.browse);
router.get("/items/:id", ItemController.read);
router.put("/items/:id", ItemController.edit);
router.post("/items", ItemController.add);
router.delete("/items/:id", ItemController.delete);

router.post("/auth/users", UserController.add);
router.get("/users", UserController.browse);
router.post("/login/users", UserController.login);
router.get("/logout/users", UserController.logout);
router.get("/users/:id", UserController.read);

router.post("/add-movies/users/:id", MovieController.addMovie);
router.get("/movies/users/:id", MovieController.read);
router.delete("/movies/:id", MovieController.delete);

module.exports = router;
