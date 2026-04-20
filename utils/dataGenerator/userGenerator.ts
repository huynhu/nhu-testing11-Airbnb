import { faker } from "@faker-js/faker";

export type User = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: string;
  role: string;
};

export const userGenerator = (overrides: Partial<User> = {}): User => {
  const user: User = {
    name: faker.person.fullName(),

    email: `auto_${Date.now()}@test.com`,

    password: faker.internet.password({
      length: 10,
      memorable: true,
    }),

    phone: faker.string.numeric(10),

    birthday: faker.date
      .birthdate({
        min: 18,
        max: 60,
        mode: "age",
      })
      .toLocaleDateString("en-GB"),

    gender: faker.helpers.arrayElement(["Nam", "Nữ"]),
    role: "USER",
  };

  // Cho phép override field khi cần test case đặc biệt
  return { ...user, ...overrides };
};
