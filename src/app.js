
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import express from "express";
import cors from "cors";
import { routes } from "./router";

export const app = express();

app.use(cors());
app.use(express.json());
routes(app);
