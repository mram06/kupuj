import CategoriesDBService from "../models/categories/CategoriesDBService.mjs";

class CategoriesController {
  static async getList(req, res) {
    try {
      const categoriesList = await CategoriesDBService.getList();

      res.json(categoriesList);
    } catch (error) {
      console.error("Fetching categories:", error);
      res.status(500).json({ error: "Fetching categories error" });
    }
  }
}
export default CategoriesController;
