import request from "supertest";
import { app, server } from "../server";
import guitarService from "../services/guitarService";

describe("Guitar Routes", () => {
  const mockGuitar = {
    id: "1",
    name: "Fender Stratocaster",
    price: 1000,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
    server.close();
  });

  // Status 200
  it("should get guitar with a given id", async () => {
    guitarService.getGuitar = jest.fn().mockResolvedValue(mockGuitar);

    const guitarId = "1";

    const response = await request(app)
      .get("/guitars/getGuitar")
      .send({ id: guitarId });

    expect(response.body).toEqual(mockGuitar);
    expect(response.status).toBe(200);
  });
  it("should get all guitars", async () => {
    guitarService.getGuitars = jest.fn().mockResolvedValue([mockGuitar]);

    const response = await request(app).get("/guitars/getGuitars");

    expect(response.body).toEqual([mockGuitar]);
    expect(response.status).toBe(200);
  });
  it("should update a guitar", async () => {
    const updatedGuitarData = {
      id: "1",
      name: "Updated Guitar",
      price: 2000,
    };

    guitarService.updateGuitar = jest.fn().mockResolvedValue(updatedGuitarData);

    const response = await request(app)
      .put("/guitars/updateGuitar")
      .send(updatedGuitarData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedGuitarData);
  });
  it("should delete an existing guitar", async () => {
    guitarService.deleteGuitar = jest.fn().mockResolvedValue("Guitar deleted");

    const response = await request(app)
      .delete("/guitars/deleteGuitar")
      .send({ id: "1" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual("Guitar deleted");
  });

  // Status 400

  it("should return 400 if no id is provided to getGuitar", async () => {
    const response = await request(app).get("/guitars/getGuitar");

    expect(response.body).toEqual("No id provided");
    expect(response.status).toBe(400);
  });
  it("should return 400 if no manufacturer is provided in updateGuitar", async () => {
    const response = await request(app)
      .put("/guitars/updateGuitar")
      .send({ manufacturer: "", title: "Squier Stratocaster", price: 1000 });

    expect(response.body).toEqual("Invalid input for updating guitar.");
    expect(response.status).toBe(400);
  });
  it("should return 400 if no price is provided in updateGuitar", async () => {
    const response = await request(app).put("/guitars/updateGuitar").send({
      manufacturer: "Fender",
      title: "Fender Stratocaster",
      price: "",
    });

    expect(response.body).toEqual("Invalid input for updating guitar.");
    expect(response.status).toBe(400);
  });
});
