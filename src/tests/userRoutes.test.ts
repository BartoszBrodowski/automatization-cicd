import request from "supertest";
import { app, server } from "../server";
import userService from "../services/userService";
import userController from "../controllers/userController";

describe("User Routes", () => {
  const mockUserData = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
    server.close();
  });

  // Status 200

  it("should create a new user", async () => {
    const newUserData = { name: "New User", email: "newuser@example.com" };
    userService.createUser = jest.fn().mockResolvedValue(newUserData);

    const response = await request(app)
      .post("/users/createUser")
      .send(newUserData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual("User created!");
  });
  it("should get user with a given id", async () => {
    userService.getUser = jest.fn().mockResolvedValue(mockUserData);

    const userId = "1";

    const response = await request(app)
      .get(`/users/getUser`)
      .send({ id: userId });

    expect(response.body).toEqual(mockUserData);
    expect(response.status).toBe(200);
  });
  it("should update a user", async () => {
    const updatedUserData = {
      id: "1",
      name: "Updated User",
      email: "updateduser@example.com",
    };

    userService.updateUser = jest.fn().mockResolvedValue(updatedUserData);

    const response = await request(app)
      .put("/users/updateUser")
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual("User updated!");
  });
  it("should delete an existing user", async () => {
    userService.deleteUser = jest.fn().mockResolvedValue("User deleted");

    const response = await request(app)
      .delete("/users/deleteUser")
      .send({ id: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual("User deleted!");
  });

  // Status 404

  it("should return a 404 response if user is not found", async () => {
    userService.getUser = jest.fn().mockResolvedValue(null);

    const response = await request(app).get("/users/getUser");

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });
  it("should return a 404 response if user creation fails", async () => {
    userService.createUser = jest.fn().mockResolvedValue(null);

    const userData = {
      name: "New User",
      email: "newuser@example.com",
    };

    const response = await request(app)
      .post("/users/createUser")
      .send(userData);

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User could not be created");
  });
  it("should return a 404 response if user update fails", async () => {
    userService.updateUser = jest.fn().mockResolvedValue(null);

    const userData = {
      id: "1",
      name: "Updated User",
      email: "updatedmail@example.com",
    };

    const response = await request(app).put("/users/updateUser").send(userData);

    expect(response.status).toBe(404);
    expect(response.body).toEqual("User not found");
  });
  it("should return a 404 response if user deletion fails", async () => {
    userService.deleteUser = jest.fn().mockImplementation(() => {
      throw new Error("User deletion failed");
    });

    const response = await request(app)
      .delete("/users/deleteUser")
      .send({ id: "1" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("User deletion failed");
  });

  // Status 400
  it("should return a 400 response is getting user fails", async () => {
    userService.getUser = jest.fn().mockImplementation(() => {
      throw new Error("User not found");
    });

    const response = await request(app).get("/users/getUser");

    expect(response.status).toBe(400);
    expect(response.body).toEqual("User not found");
  });

  it("should return a 400 response if user name is not proper", async () => {
    userService.updateUser = jest.fn().mockResolvedValue(null);

    const userData = {
      id: "1",
      name: "",
      email: "updatedmail@example.com",
    };

    const response = await request(app).put("/users/updateUser").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Invalid input for updating user.");
  });
  it("should return a 400 response if user email is not proper", async () => {
    userService.updateUser = jest.fn().mockResolvedValue(null);

    const userData = {
      id: "1",
      name: "New name",
      email: "",
    };

    const response = await request(app).put("/users/updateUser").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Invalid input for updating user.");
  });
  it("should return a 400 response if user email and name is not proper", async () => {
    userService.updateUser = jest.fn().mockResolvedValue(null);

    const userData = {
      id: "1",
      name: "",
      email: "",
    };

    const response = await request(app).put("/users/updateUser").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual("Invalid input for updating user.");
  });
  it("should return a 404 response when the user is not found", async () => {
    userService.updateUser = jest.fn().mockResolvedValue(null);

    const userData = {
      id: "nonExistentUserId",
      name: "Updated Name",
      email: "updatedemail@example.com",
    };

    const response = await request(app).put("/users/updateUser").send(userData);

    expect(response.body).toEqual("User not found");
    expect(response.status).toBe(404);
  });
  it("should return a 404 response when the user is not found", async () => {
    (userService.updateUser as jest.Mock).mockResolvedValue(false);

    const req: any = {
      body: {
        id: "nonExistentUserId",
        name: "Updated Name",
        email: "updated@example.com",
      },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("User not found");
  });

  it("should return a 400 response if user deletion fails", async () => {
    userService.deleteUser = jest.fn().mockImplementation(() => {
      throw new Error("User deletion failed");
    });

    const response = await request(app)
      .delete("/users/deleteUser")
      .send({ id: "1" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual("User deletion failed");
  });
});
