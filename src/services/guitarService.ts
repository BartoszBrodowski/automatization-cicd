import { session } from "../config/connector";

type UUID = string;

class GuitarService {
  getGuitar = async (id: UUID) => {
    const result = await session.run(
      "MATCH (g:Guitar) WHERE g.id = $id RETURN g",
      {
        id,
      }
    );
    const guitar = result.records[0].get("g").properties;
    guitar.price = guitar.price.low;
    return guitar;
  };
  getGuitarPage = async (page: number, size: number) => {
    const skipValue = page * size;
    const result = await session.run(
      "MATCH (g:Guitar) WITH count(g) as totalGuitars MATCH (g:Guitar) RETURN totalGuitars, collect(g)[toInteger($skip)..toInteger($skip)+toInteger($limit)] as guitars",
      {
        skip: skipValue,
        limit: size,
      }
    );
    const totalGuitars = result.records[0].get("totalGuitars").toNumber();
    const guitars = result.records[0].get("guitars").map((record: any) => {
      const guitar = record.properties;
      return guitar;
    });
    return { totalGuitars, guitars };
  };
  getGuitars = async () => {
    const result = await session.run("MATCH (g:Guitar) RETURN g");
    const guitars = result.records.map((record) => {
      const guitar = record.get("g").properties;
      guitar.price = guitar.price.low;
      return guitar;
    });
    return guitars;
  };
  updateGuitar = async (id: UUID, name: string, price: number) => {
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
  };
  deleteGuitar = async (id: UUID) => {
    await session.run("MATCH (g:Guitar) WHERE g.id = $id DELETE g", {
      id,
    });
    return "Guitar deleted";
  };
}

const guitarService = new GuitarService();

export default guitarService;
