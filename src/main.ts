import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { NestExpressApplication } from "@nestjs/platform-express"
import { AppModule } from "./app.module"

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT || 5000

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: "*",
      methods: "GET, POST, PATCH, DELETE",
      allowedHeaders: ["Content-Type"],
      preflightContinue: false
    }
  })

  app.setGlobalPrefix("api")

  await app.listen(PORT, () => Logger.log(`Server is started on port = ${PORT}`))
}
bootstrap()
