import { Driver, Session, Record } from "neo4j-driver";
import { v4 as uuidv4 } from "uuid";
import { driver } from "../config/connector";

type UUID = string;

class UserService {
  private driver: Driver;

  constructor(driver: Driver) {
    this.driver = driver;
  }

  getUser = async (id: UUID) => {
    let session: Session | null = null;
    try {
      session = this.driver.session();
      const result = await session.run(
        "MATCH (u:User) WHERE u.id = $id RETURN u",
        {
          id,
        }
      );
      const users = result.records.map(
        (record: Record) => record.get("u").properties
      );
      return users;
    } finally {
      if (session) {
        await session.close();
      }
    }
  };

  createUser = async (name: string, email: string) => {
    const id = uuidv4();
    let session: Session | null = null;
    try {
      session = this.driver.session();
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
    } finally {
      if (session) {
        await session.close();
      }
    }
  };

  updateUser = async (id: string, name: string, email: string) => {
    let session: Session | null = null;
    try {
      session = this.driver.session();
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
    } finally {
      if (session) {
        await session.close();
      }
    }
  };

  deleteUser = async (id: string): Promise<boolean> => {
    let session: Session | null = null;
    try {
      session = this.driver.session();
      const user = await session.run(
        "MATCH (u:User) WHERE u.id = $id DELETE u",
        {
          id,
        }
      );
      const isUserDeleted = user.summary.updateStatistics.containsUpdates();
      return isUserDeleted;
    } finally {
      if (session) {
        await session.close();
      }
    }
  };
}

const userService = new UserService(driver);

export default userService;
