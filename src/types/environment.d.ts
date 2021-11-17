declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test"
      PORT: string
      POSTGRES_HOST: string
      POSTGRES_USER: string
      POSTGRES_DB: string
      POSTGRESS_PASSWORD: string
      POSTGRESS_PORT: string
      PRIVATE_KEY: string
      JWT_SECRET: string
      POSTGRES_DB_TEST: string
    }
  }
}

export {}
