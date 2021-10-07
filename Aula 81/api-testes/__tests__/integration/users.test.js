const app = require("../../src/app");
const request = require("supertest");
const { sequelize } = require("../../src/db/models");

describe("Criar usuário", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test("deve ser possível criar um usuário", async () => {
        const user = {
            name: "teste",
            email: "teste@email.com",
            password: "123456"
        };

        const response = await request(app).post("/api/users").send(user);

        expect(response.status).toBe(201);
    }); 
    
    test("não deve ser possível criar um usuário com e-mail duplicado", async () => {
        const user = {
            name: "teste",
            email: "teste@email.com",
            password: "123456"
        };

        await request(app).post("/api/users").send(user);
        const response = await request(app).post("/api/users").send(user);

        expect(response.status).toBe(409);
    });
});