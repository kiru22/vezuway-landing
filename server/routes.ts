import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/register", async (req, res) => {
    try {
      const { email, type, role, phone } = req.body;
      const body = insertRegistrationSchema.parse({ email, type, phone, role });
      const registration = await storage.createRegistration({ ...body, role: role || "sender" });
      res.json({ success: true, data: registration });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      res.json({ data: registrations });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/visitors", async (req, res) => {
    try {
      const visitors = await storage.getAllVisitors();
      res.json({ data: visitors });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
