import * as faker from "faker"
import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"

import { AppModule } from "../src/app.module"

const PASSWORD = faker.internet.password()

const signInDto = {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: PASSWORD
}

describe("UserController (e2e)", () => {
  let app: INestApplication
  let createdUser

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await Promise.all([app.close()])
  })

  it("/user (POST) SignIn - success", async () => {
    return request(app.getHttpServer())
      .post("/user")
      .send(signInDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdUser = { email: body.user.email, password: PASSWORD }

        expect(body.user).toBeDefined()
        expect(body.token).toBeDefined()
      })
  })

  it("/user (POST) SignIn - bad email", (done) => {
    request(app.getHttpServer())
      .post("/user")
      .send({ ...signInDto, email: "not_email_#" })
      .expect(
        400,
        {
          statusCode: 400,
          message: ["email must be an email"],
          error: "Bad Request"
        },
        done
      )
  })

  it("/user/login (POST) Login - success", async () => {
    return request(app.getHttpServer())
      .post("/user/login")
      .send(createdUser)
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body.user).toBeDefined()
        expect(body.token).toBeDefined()
      })
  })

  it("/user/login (POST) Login - fail email", (done) => {
    request(app.getHttpServer())
      .post("/user/login")
      .send({ ...createdUser, email: "not_email_01" })
      .expect(
        401,
        {
          statusCode: 401,
          message: "Email not found",
          error: "Unauthorized"
        },
        done
      )
  })
})
