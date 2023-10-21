// userRoutes.test.ts
import request from 'supertest'; // For making HTTP requests
import { app, server } from '../server'; // Import your Express app
import userService from '../services/userService'; // Import your service

describe('User Routes', () => {
    afterAll(() => {
        server.close();
    });

    const testId = 'cafd3e7c-d8a9-40b8-bbd6-ad5cd07fb3ac'

    it('should get all users', async () => {
        // You can set up mock data or use a test database
        const mockId = testId;
        userService.getAllUsers = jest.fn().mockResolvedValue(mockId);

        const response = await request(app).get('/users/getUsers');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockId);
    });
    it('should create a user', async () => {
        // Define your test data
        const userData = { name: 'New User', email: 'newuser@example.com' };

        const response = await request(app)
        .post('/users/createUser')
        .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual("User created!");
    });
    it('should update a user', async () => {
        // Define your test data
        const userData = { id: testId, name: 'Updated User', email: 'updateduser@example.com'}

        const response = await request(app).put('/users/updateUser').send(userData);
        console.log(response.body)

        expect(response.body).toEqual("User updated!");
        expect(response.status).toBe(200);
    });
    it('should delete a user', async () => {
        // Define your test data
        const userData = { id: testId };
        
        const response = await request(app)
        .delete('/users/deleteUser')
        .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual("User deleted!");
    });
});
