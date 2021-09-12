if (process.env.NODE_ENV === "production") {
  require("module-alias/register")
}

import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"

async function bootstrap() {
  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ["http://localhost", "http://localhost:5000"],
      credentials: true
    }
  })

  app.setGlobalPrefix("api")
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.info(`[Nest] Server started on port = ${PORT}`))
}
bootstrap()
