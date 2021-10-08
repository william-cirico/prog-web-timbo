const { User, sequelize } = require("../../src/db/models");

beforeEach(async () => {
    await sequelize.sync({ force: true });    
});

test("deve ser possível validar uma senha criptografada", async () => {
    const user = await User.create({
        name: "teste",
        email: "teste@email.com",
        password: "123456"
    });

    expect(user.checkPassword("123456")).toBe(true);
});