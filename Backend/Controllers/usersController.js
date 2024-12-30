const express = require("express");
// Load user data
const fs = require("fs");
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/users.json`, "utf-8")
);

// check if ID is valid
const checkID = (req, resp, next, value) => {
  const userId = Number(value);
  const foundUser = users.find((el) => el.id === userId);
  if (!foundUser) {
    return resp.status(404).json({ status: "fail", message: "Invalid ID" });
  }
  next();
};
// check body
const checkBody = (req, resp, next) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return resp
      .status(500)
      .json({ status: "fail", message: "please fill all required feild" });
  }
  next();
};
// create new user
const createUser = (req, resp) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../dev-data/users.json`,
    JSON.stringify(users, null, 2),
    (error) => {
      resp.status(201).json({ status: "success", newUser: newUser });
    }
  );
};
// get all users
const getAllusers = (req, resp) => {
  if (!users) {
    resp.status(404).json({ status: "fail", message: "No users found" });
  }

  resp
    .status(200)
    .json({ status: "success", result: users.length, users: users });
};
// get user
const getUser = (req, resp) => {
  const userId = req.params.id * 1;
  const foundUser = users.find((el) => el.id === userId);

  resp.status(200).json({ status: "success", result: foundUser });
};
// update user
const updateUser = (req, resp) => {
  const userId = req.params.id * 1;
  const foundUser = users.find((el) => el.id === userId);

  const updatedUser = { ...foundUser, ...req.body };
  const userIndex = users.findIndex((el) => el.id === userId);
  users[userIndex] = updatedUser;

  fs.writeFile(
    `${__dirname}/../dev-data/users.json`,
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return resp
          .status(500)
          .json({ status: "fail", updateduser: "Error  updating user" });
      }
      resp.status(200).json({ status: "success", updatedUser: updatedUser });
    }
  );
};
// delete user
const deleteUser = (req, resp) => {
  const userId = req.params.id * 1;

  const updatedUser = users.filter((el) => el.id !== userId);
  console.log(updateUser);
  fs.writeFile(
    `${__dirname}/../dev-data/users.json`,
    JSON.stringify(updatedUser, null, 2),
    (err) => {
      if (err) {
        resp
          .status(500)
          .json({ status: "error", message: "Error  deleteing user" });
      }
      resp.status(200).json({
        status: "success",
        data: null,
        message: "deleted succcefully",
      });
    }
  );
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllusers,
  getUser,
  checkID,
  checkBody,
};
