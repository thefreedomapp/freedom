import * as trpc from "@trpc/server";
import { router as userRouter } from "./users";

export const router = trpc.router().merge("users:", userRouter);

export type Router = typeof router;
