import { validationResult } from "express-validator";
import fs from "fs";

class AdValidator {
  static adSchema = {
    title: {
      notEmpty: {
        errorMessage: "Title is required",
      },
      trim: true,
    },
    category: {
      notEmpty: {
        errorMessage: "Category is required",
      },
      trim: true,
      escape: true,
    },
    condition: {
      trim: true,
      escape: true,
    },
    price: {
      notEmpty: {
        errorMessage: "Price is required",
      },
      trim: true,
      escape: true,
    },
    description: {
      notEmpty: {
        errorMessage: "Price is required",
      },
      isLength: {
        options: { min: 30, max: 1000 },
        errorMessage:
          "Description must be at least 30 and max 400 characters long",
      },
      escape: true,
    },
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
      trim: true,
      escape: true,
    },
    email: {
      isEmail: {
        errorMessage: "Invalid email address",
      },
      notEmpty: {
        errorMessage: "Email is required",
      },
      trim: true,
      escape: true,
    },
    phone: {
      notEmpty: {
        errorMessage: "Phone is required",
      },
      trim: true,
      escape: true,
    },
    city: {
      notEmpty: {
        errorMessage: "City is required",
      },
      trim: true,
      escape: true,
    },
  };
  static checkFile(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) {
        // Видаляємо завантажений файл, якщо поля не валідні
        fs.unlinkSync(req.file.path);
      }
    }
    next();
  }
}

export default AdValidator;
