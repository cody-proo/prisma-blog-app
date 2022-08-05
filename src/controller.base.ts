import { PrismaClient } from "@prisma/client";

export class BaseController {
  protected client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
}
