declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      PORT: number
      POSTGRES_HOST: string
      POSTGRES_USER: string
      POSTGRES_DB: string
      POSTGRESS_PASSWORD: string
      POSTGRESS_PORT: string
      PRIVATE_KEY: string
    }
  }
}

export {}
