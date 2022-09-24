import { PrismaClient } from "@prisma/client"
// we need to ignore this line because it gives errors very often, even though it works
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MONGODB_URI } from "$env/static/private"

if (!MONGODB_URI) throw new Error("MONGODB_URI is not set")

// Vite doesn't seem to put the variables from the `.env` into the environment, so this is a workaround.
process.env.MONGODB_URI = MONGODB_URI

export default new PrismaClient()
