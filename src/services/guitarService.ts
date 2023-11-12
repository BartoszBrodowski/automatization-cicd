import { Driver } from "neo4j-driver";
import { driver } from "../config/connector";

type UUID = string;

class GuitarService {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async getGuitar(id: UUID) {
    const session = this.driver.session();
    try {
      const result = await session.run(
        "MATCH (g:Guitar) WHERE g.id = $id RETURN g",
        {
          id,
        }
      );
      const guitar = result.records[0].get("g").properties;
      guitar.price = guitar.price.low;
      return guitar;
    } finally {
      await session.close();
    }
  }

  async getGuitarPage(page: number, size: number) {
    const skipValue = page * size;
    const session = this.driver.session();
    try {
      const result = await session.executeRead(async (tx) => {
        return await tx.run(
          "MATCH (g:Guitar) WITH count(g) as totalGuitars MATCH (g:Guitar) RETURN totalGuitars, collect(g)[toInteger($skip)..toInteger($skip)+toInteger($limit)] as guitars",
          { skip: skipValue, limit: size }
        );
      });
      const totalGuitars = result.records[0].get("totalGuitars").toNumber();
      const guitars = result.records[0].get("guitars").map((record: any) => {
        const guitar = record.properties;
        return guitar;
      });
      return { totalGuitars, guitars };
    } finally {
      await session.close();
    }
  }

  async getGuitars() {
    const session = this.driver.session();
    try {
      const result = await session.run("MATCH (g:Guitar) RETURN g");
      const guitars = result.records.map((record) => {
        const guitar = record.get("g").properties;
        guitar.price = guitar.price.low;
        return guitar;
      });
      return guitars;
    } finally {
      await session.close();
    }
  }

  async updateGuitar(id: UUID, name: string, price: number) {
    const session = this.driver.session();
    try {
      const result = await session.run(
        "MATCH (g:Guitar) WHERE g.id = $id SET g.name = $name, g.price = $price RETURN g",
        {
          id,
          name,
          price,
        }
      );
      const guitar = result.records[0].get("g").properties;
      guitar.price = guitar.price.low;
      return guitar;
    } finally {
      await session.close();
    }
  }

  async deleteGuitar(id: UUID) {
    const session = this.driver.session();
    try {
      await session.run("MATCH (g:Guitar) WHERE g.id = $id DELETE g", {
        id,
      });
      return "Guitar deleted";
    } finally {
      await session.close();
    }
  }
}

const guitarService = new GuitarService(driver);

export default guitarService;
