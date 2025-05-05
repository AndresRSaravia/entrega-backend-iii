import {faker} from '@faker-js/faker';
import { createHash } from '../utils/index.js';

class MockingService {
	static async generateMockingPets(quantity) {
		const pets = [];
		for (let index = 0; index < quantity; index++) {
			pets.push({
				name: faker.animal.dog(),
				specie: faker.animal.type(),
				adopted: false,
				birthDate: faker.date.past(),
				image: 'https://via.placeholder.com/150'
			});
		}
		return pets;
	}

	static async generateMockingUsers(quantity) {
		const users = [];
		for (let index = 0; index < quantity; index++) {
			const first_name = faker.person.firstName()
			const last_name = faker.person.lastName()
			const email = first_name+last_name+"@email.com"
			users.push({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: await createHash('coder123'),
				role: (Math.floor(Math.random() * 2) == 0) ? 'admin' : 'user',
				pets: []
			});
		}
		return users;
	}
}

export default MockingService;