const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get(
  "/liked_pokemons",
  isAuthenticated,
  userController.getLikedPokemonsByUserId
);
router.get(
  "/disliked_pokemons",
  isAuthenticated,
  userController.getDislikedPokemonsByUserId
);

router.get("/:user_id/liked_pokemons", isAuthenticated, userController.getLikedPokemonsByUserId);
router.get("/:user_id/disliked_pokemons", isAuthenticated, userController.getDislikedPokemonsByUserId);
router.get("/search", isAuthenticated, userController.searchUsers);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
