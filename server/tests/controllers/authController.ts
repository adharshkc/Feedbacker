import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import * as authController from "../../src/controllers/authController";
import * as authService from "../../src/services/authService";

vi.mock("../../src/services/authService");

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  describe("register", () => {
    it("should register a user and return a 201 status", async () => {
      
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "USER",
      };

      const mockUser = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "USER",
      };
      vi.mocked(authService.registerUser).mockResolvedValue(mockUser);

      await authController.register(req as Request, res as Response, next);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockUser,
      });
    });

    it("should call next with an error if registration fails", async () => {
      
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "USER",
      };

      const mockError = new Error("Registration failed");
      vi.mocked(authService.registerUser).mockRejectedValue(mockError);

      await authController.register(req as Request, res as Response, next);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe("login", () => {
    it("should log in a user and return a 200 status", async () => {
      
      req.body = {
        email: "john@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "john@example.com",
        token: "fakeToken",
      };
      vi.mocked(authService.loginUser).mockResolvedValue(mockUser);

      await authController.login(req as Request, res as Response, next);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockUser,
      });
    });

    it("should call next with an error if login fails", async () => {
      
      req.body = {
        email: "john@example.com",
        password: "password123",
      };

      const mockError = new Error("Login failed");
      vi.mocked(authService.loginUser).mockRejectedValue(mockError);

      await authController.login(req as Request, res as Response, next);

      expect(authService.loginUser).toHaveBeenCalledWith(req.body);
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});