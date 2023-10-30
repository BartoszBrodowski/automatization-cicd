import { session } from "../config/connector";
import { v4 as uuidv4 } from "uuid";

type UUID = string;

class UserService {
  getUser = async (id: UUID) => {
    const result = await session.run(
      "MATCH (u:User) WHERE u.id = $id RETURN u",
      {
        id,
      }
    );
    const users = result.records.map((record) => record.get("u").properties);
    return users;
  };
  createUser = async (name: string, email: string) => {
    const id = uuidv4();
    const result = await session.run(
      "CREATE (u:User {id: $id, name: $name, email: $email}) RETURN u",
      {
        id,
        name,
        email,
      }
    );
    const newUser = result.records[0].get("u").properties;

    return newUser;
  };
  updateUser = async (id: string, name: string, email: string) => {
    const result = await session.run(
      "MATCH (u:User) WHERE u.id = $id SET u.name = $name, u.email = $email RETURN u",
      {
        id,
        name,
        email,
      }
    );
    const updatedUser = result.records[0].get("u").properties;
    return updatedUser;
  };
  deleteUser = async (id: string): Promise<boolean> => {
    const user = await session.run("MATCH (u:User) WHERE u.id = $id DELETE u", {
      id,
    });
    const isUserDeleted = user.summary.updateStatistics.containsUpdates();
    return isUserDeleted;
  };
}

const userService = new UserService();

export default userService;
