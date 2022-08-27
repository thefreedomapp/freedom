import { PrismaClient } from "@prisma/client";
import { MONGODB_URI } from "$env/static/private";

if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

export default new PrismaClient();
