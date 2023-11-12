import neo4j, { Driver } from "neo4j-driver";

export const driver: Driver = neo4j.driver("neo4j://localhost:7687");
