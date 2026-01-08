import { validationResult } from "express-validator";
import AdsDBService from "../models/ads/AdsDBService.mjs";
import fs from "fs/promises";
import path from "path";

class AdsController {
  static perPage = 10;

  static async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const data = req.body;
        return res.status(400).json({
          errors: errors.array(),
          error: "Advert creating validation error",
          data: data,
        });
      }

      const data = {
        title: req.body.title,
        category_id: req.body.category,
        ad_condition: req.body.condition,
        price: req.body.price,
        description: req.body.description,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        photos: JSON.stringify(req.files?.map((photo) => photo.filename) || []),
        user_id: req.user.id,
      };
      const newAd = await AdsDBService.create(data);
      res.status(200).json({
        message: "Advert created successfully",
        data: newAd,
      });
    } catch (error) {
      console.error("Creating advert error:", error);
      res.status(500).json({ error: "Creating advert error" });
    }
  }

  static async getList(req, res) {
    try {
      const searchParams = req.query;

      const page = parseInt(searchParams.page);
      const skip = (page - 1) * AdsController.perPage || 0;

      const advertsList = await AdsDBService.getList(
        skip,
        AdsController.perPage,
        searchParams
      );

      setTimeout(() => {
        res.json(advertsList);
      }, 1000);
    } catch (error) {
      console.error("Fetching ads:", error);
      res.status(500).json({ error: "Fetching adverts error" });
    }
  }

  static async getTopList(req, res) {
    try {
      const advertsList = await AdsDBService.getTopList();

      setTimeout(() => {
        res.json(advertsList);
      }, 1000);
    } catch (error) {
      console.error("Fetching top ads:", error);
      res.status(500).json({ error: "Fetching top adverts error" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const advert = await AdsDBService.getById(id);

      res.json(advert);
    } catch (error) {
      console.error("Fetching ad:", error);
      res.status(500).json({ error: "Fetching advert error" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if ad exists and belongs to user
      const ad = await AdsDBService.getById(id);
      if (!ad) {
        return res.status(404).json({ error: "Advertisement not found" });
      }

      if (ad.user_id !== userId) {
        return res
          .status(403)
          .json({ error: "You can only update your own advertisements" });
      }

      // Handle photos - combine existing (from frontend) and new uploaded photos
      let photos = [];

      // If frontend sends existingPhotos, use those
      if (req.body.existingPhotos) {
        if (typeof req.body.existingPhotos === "string") {
          try {
            photos = JSON.parse(req.body.existingPhotos);
          } catch (e) {
            photos = [req.body.existingPhotos];
          }
        } else if (Array.isArray(req.body.existingPhotos)) {
          photos = req.body.existingPhotos;
        }
      }

      // Add new uploaded files to existing photos
      if (req.files && req.files.length > 0) {
        const newPhotos = req.files.map((file) => file.filename);
        photos = [...photos, ...newPhotos];
      }

      const updateData = {
        title: req.body.title || ad.title,
        description: req.body.description || ad.description,
        ad_condition: req.body.condition || ad.ad_condition,
        category_id: req.body.category || ad.category_id,
        city: req.body.city || ad.city,
        price: req.body.price || ad.price,
        photos: JSON.stringify(photos),
      };

      const result = await AdsDBService.update(id, updateData);

      const updatedAd = await AdsDBService.getById(id);
      res.status(200).json({
        message: "Advertisement updated successfully",
        data: updatedAd,
      });
    } catch (error) {
      console.error("Updating ad error:", error);
      res.status(500).json({ error: "Updating advertisement error" });
    }
  }

  static async getByUserId(req, res) {
    try {
      const { id } = req.params;

      const advertsList = await AdsDBService.getByUserId(id);

      setTimeout(() => {
        res.json(advertsList);
      }, 1000);
    } catch (error) {
      console.error("Fetching ads:", error);
      res.status(500).json({ error: "Fetching adverts error" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Check if ad exists and belongs to user
      const ad = await AdsDBService.getById(id);
      if (!ad) {
        return res.status(404).json({ error: "Advertisement not found" });
      }

      if (ad.user_id !== userId) {
        return res
          .status(403)
          .json({ error: "You can only delete your own advertisements" });
      }

      // Delete photos from disk
      if (ad.photos) {
        try {
          let photos = [];
          if (typeof ad.photos === "string" && ad.photos.length > 0) {
            photos = JSON.parse(ad.photos);
          } else if (Array.isArray(ad.photos)) {
            photos = ad.photos;
          }

          for (const photoName of photos) {
            const filePath = path.join(process.cwd(), "uploads", photoName);
            try {
              await fs.unlink(filePath);
            } catch (err) {
              console.warn(`Could not delete photo ${photoName}:`, err.message);
            }
          }
        } catch (err) {
          console.warn("Error processing photos:", err);
        }
      }

      // Delete ad from database
      await AdsDBService.delete(id);

      res.status(200).json({
        message: "Advertisement deleted successfully",
      });
    } catch (error) {
      console.error("Deleting ad error:", error);
      res.status(500).json({ error: "Deleting advertisement error" });
    }
  }
}
export default AdsController;
