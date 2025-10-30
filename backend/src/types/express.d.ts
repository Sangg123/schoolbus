// Import the base Express Request type
import { Request } from 'express';

// Import the User type from your Prisma client or your custom type definition
import { User } from '@prisma/client';
// NOTE: Adjust the import path for 'User' based on your project structure.

declare module 'express' {
  interface Request {
    // 💡 Add the user property here
    // The type of 'user' should be the type returned by your LocalStrategy.validate()
    user?: User;
  }
}
