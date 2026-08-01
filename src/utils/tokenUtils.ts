import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt-ts";

export const generateAccessToken = (userId: string) =>
    jwt.sign({ sub: userId }, process.env.NEXTAUTH_SECRET!, {
        expiresIn: "15m",
    });

export const generateRefreshToken = () => randomBytes(48).toString("hex");

export const hashToken = (token: string) => hashSync(token, 10);

export const compareToken = (token: string, hash: string) => compareSync(token, hash);
