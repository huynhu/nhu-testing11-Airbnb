import { faker } from "@faker-js/faker";

export type APIUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export const apiUserGenerator = (overrides: Partial<APIUser> = {}): APIUser => {
  const user: APIUser = {
    name: faker.person.fullName(),

    email: `auto_${Date.now()}@test.com`,

    password: faker.internet.password({
      length: 10,
      memorable: true,
    }),

    phone: faker.phone.number({ style: "national" }),

    birthday: faker.date
      .birthdate({
        min: 18,
        max: 60,
        mode: "age",
      })
      .toLocaleDateString("en-US"),

    gender: faker.datatype.boolean(),
    role: "USER",
  };

  // Cho phép override field khi cần test case đặc biệt
  return { ...user, ...overrides };
};
