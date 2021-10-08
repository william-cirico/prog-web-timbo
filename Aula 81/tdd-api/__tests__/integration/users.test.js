const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../src/db/models");

beforeEach(async () => {
    await sequelize.sync({ force: true });    
});

describe("Criar um usuário", () => {
    test("deve ser possível criar um usuário", async () => {
        const response = await request(app).post("/api/users").send({
            name: "teste",
            email: "teste@email.com",
            password: "123456"
        });

        expect(response.status).toBe(201);    
        expect(response.body.name).toBe("teste");    
    });

    test("não deve ser possível criar um usuário com um e-mail já cadastrado", async () => {
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

describe("Obter usuários", () => {
    test("deve ser possível obter os usuários criados", async () => {
        await request(app).post("/api/users").send({
            name: "teste1",
            email: "teste1@email.com",
            password: "123456"
        });
        await request(app).post("/api/users").send({
            name: "teste2",
            email: "teste2@email.com",
            password: "123456"
        });

        const response = await request(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe("Atualizar as informações do usuário", () => {
    test("deve ser possível atualizar as informações do usuário", async () => {
        const user = await request(app).post("/api/users").send({
            name: "teste",
            email: "teste@email.com",
            password: "123456"
        });

        const response = await request(app)
            .put(`/api/users/${user.body.id}`)
            .send({
                name: "testeModificado"
            });        

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("testeModificado");
    });

    test("não deve ser possível atualizar as informações de um usuário que não existe", async () => {
        const response = await request(app)
            .put(`/api/users/1`)
            .send({
                name: "testeModificado"
            });        

        expect(response.status).toBe(404);        
    });
});

describe("Remover um usuário", () => {
    test("deve ser possível remover um usuário", async () => {
        const user = await request(app).post("/api/users").send({
            name: "teste",
            email: "teste@email.com",
            password: "123456"
        });

        const response = await request(app).delete(`/api/users/${user.body.id}`);
        expect(response.status).toBe(204);
    });

    test("não deve ser possível remover um usuário que não existe", async () => {
        const response = await request(app).delete(`/api/users/1`);
        expect(response.status).toBe(404);
    });
});