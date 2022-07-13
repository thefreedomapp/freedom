import { createRequire } from "module";
const require = createRequire(import.meta.url);
const bcrypt = require("@node-rs/bcrypt");

export const DEFAULT_COST: 12 = bcrypt.DEFAULT_COST;

export const hashSync: (password: string | Buffer, round?: number) => string = bcrypt.hashSync;
export const hash: (password: string | Buffer, round?: number) => Promise<string> = bcrypt.hash;
export const verifySync: (password: string | Buffer, hash: string | Buffer) => boolean =
	bcrypt.verifySync;
export const verify: (password: string | Buffer, hash: string | Buffer) => Promise<boolean> =
	bcrypt.verify;
/**
 * The same with `verifySync`
 */
export const compareSync: (password: string | Buffer, hash: string | Buffer) => boolean =
	bcrypt.compareSync;
/**
 * The same with `verify`
 */
export const compare: (password: string | Buffer, hash: string | Buffer) => Promise<boolean> =
	bcrypt.compare;

export type Version = "2a" | "2x" | "2y" | "2b";

/**
 * @param round default 10
 * @param version default '2b'
 */
export const genSaltSync: (round?: number, version?: Version) => string = bcrypt.genSaltSync;
/**
 * @param round default 10
 * @param version default '2b'
 */
export const genSalt: (round?: number, version?: Version) => Promise<string> = bcrypt.genSalt;
