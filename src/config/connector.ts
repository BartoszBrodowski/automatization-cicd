import { Session } from 'neo4j-driver';
import neo4j from 'neo4j-driver';
import { USER, PASSWORD } from './variables';

const driver = neo4j.driver(
	'neo4j+s://a29d84d8.databases.neo4j.io',
	neo4j.auth.basic(USER, PASSWORD)
);
export const session: Session = driver.session();
