import neo4j, { Session } from "neo4j-driver";

const driver = neo4j.driver("neo4j://localhost:7687");
export const session: Session = driver.session();
