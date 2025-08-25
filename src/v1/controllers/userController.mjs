import UsersDBService from "../models/user/UsersDBService.mjs";
import TypesDBService from "../models/type/TypesDBService.mjs";
import { validationResult } from "express-validator";

class UserController {
  static async usersList(req, res) {}

  static async registerUser(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;
  }

  static async deleteUser(req, res) {}
}

export default UserController;
