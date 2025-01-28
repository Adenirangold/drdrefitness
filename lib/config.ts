export const config = {
  databaseUrl: process.env.MONGO_URI!,
  jwt: {
    secretKey: process.env.JWT_SECRET!,
    expirationTime: process.env.JWT_EXPIRATION!,
  },
};
