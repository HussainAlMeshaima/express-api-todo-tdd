const request = require("supertest");
const assert = require("assert");
const express = require("express");

const app = require("../app");

describe("test api todos", function () {
  //
  test("GET /todos --> array of todo's", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              isCompleted: expect.any(Boolean),
            }),
          ])
        );
        // console.log(res.body);
      });
  });

  //
  test("GET /todo/id --> 404 Not Found", () => {
    return request(app).get("/todos/5000").expect(404);
  });

  //
  test("GET /todos/id --> todo details", () => {
    return request(app)
      .get("/todos/3")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            isCompleted: expect.any(Boolean),
          })
        );
        //console.log(res.body);
      });
  });

  //
  test("POST /todo/create --> create todo", () => {
    return request(app)
      .post("/todos/create")
      .send({
        id: 4,
        title: "Go To Work",
        isCompleted: false,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            isCompleted: expect.any(Boolean),
          })
        );
        //console.log(res.body);
        // console.log(request(app).get("/todos"));
      });
  });

  test("PUT /todo/id --> update todo", () => {
    return request(app)
      .put("/todos/2")
      .send({
        id: 2,
        title: "Drinking Water",
        isCompleted: true,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            isCompleted: expect.any(Boolean),
          })
        );
      });
  });

  test("PUT /todo/id --> 404 Not Found", () => {
    return request(app)
      .put("/todos/40")
      .send({
        id: 20,
        title: "Drinking Water",
        isCompleted: true,
      })
      .expect(404);
  });
});
