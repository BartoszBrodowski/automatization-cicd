import { session } from '../config/connector';

export class UserService {
	getAllUsers = async () => {
		const result = await session.run('MATCH (u:User) RETURN u');
		const users = result.records.map((record) => record.get('u').properties);
		return users;
	};
	createUser = async (name: string, email: string) => {
		const result = await session.run('CREATE (u:User {name: $name, email: $email}) RETURN u', {
			name,
			email,
		});
		const newUser = result.records[0].get('u').properties;

		return newUser;
	};
}
