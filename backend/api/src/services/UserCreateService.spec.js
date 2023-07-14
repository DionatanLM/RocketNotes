const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateServices = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateServices = new UserCreateService(userRepositoryInMemory);
  });

  it("User should be create", async () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "123",
    };

    const userCreated = await userCreateServices.execute(user);

    expect(userCreated).toHaveProperty("id");
  });

  it("User should not be create with email exists", async () => {
    const user = {
      name: "John Doe",
      email: "john@example.com",
      password: "123",
    };

    const user2 = {
      name: "User 2",
      email: "john@example.com",
      password: "123",
    };

    await userCreateServices.execute(user);
    await expect(userCreateServices.execute(user2)).rejects.toEqual(
      new AppError("Este e-mail já está cadastrado")
    );
  });
});
