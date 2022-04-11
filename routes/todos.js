var express = require("express");
var httpErrors = require("http-errors");
var router = express.Router();

const myToDos = [
  { id: 1, title: "My First ToDo", isCompleted: false },
  { id: 2, title: "Drink water", isCompleted: false },
  { id: 3, title: "Eat lunch", isCompleted: false },
];

router.get("/", function (req, res) {
  res.status(200).json(myToDos);
});

router.get("/:id", function (req, res, next) {
  let found = myToDos.find((todo) => todo.id === Number(req.params.id));

  if (!found) {
    return next(httpErrors(404, "Not Found"));
  }

  res.status(200).json(found);
});

router.post("/create", function (req, res, next) {
  const { body } = req;

  const newToDo = {
    id: body.id,
    title: body.title,
    isCompleted: body.isCompleted,
  };

  myToDos.push(newToDo);

  res.status(201).json(newToDo);
});

router.put("/:id", function (req, res, next) {
  const { body } = req;

  let found = myToDos.find((todo) => todo.id === Number(req.params.id));

  if (!found) {
    return next(httpErrors(404, "Not Found"));
  }

  const newToDo = {
    id: body.id,
    title: body.title,
    isCompleted: body.isCompleted,
  };

  myToDos[body.id - 1] = newToDo;

  res.status(201).json(newToDo);
});

module.exports = router;
