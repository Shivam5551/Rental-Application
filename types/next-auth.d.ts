import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
    tokenValid?: boolean
    tokenExpired?: boolean
    error?: string
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    refreshToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
    accessTokenExpires?: number
    refreshToken?: string
    provider?: string
    uid?: string
    error?: string
  }
}
