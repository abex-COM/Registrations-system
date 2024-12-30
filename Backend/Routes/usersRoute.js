const {
  getAllusers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  checkID,
  checkBody,
} = require("../Controllers/usersController");
const express = require("express");
const router = express.Router();
router.route("/").post(checkBody, createUser).get(getAllusers);
router.param("id", checkID);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
