import FavoritesDBService from "../models/favorites/FavoritesDBService.mjs";

class FavoritesController {
  static async add(req, res) {
    const id = parseInt(req.params.id);
    try {
      const result = await FavoritesDBService.add(id, req.user.id);
      res.json(result);
    } catch (error) {
      console.error("Adding favorites:", error);
      res.status(500).json({ error: "Adding favorites: error" });
    }
  }

  static async getList(req, res) {
    try {
      const favoritesList = await FavoritesDBService.getList(req.user.id);
      res.json(favoritesList);
    } catch (error) {
      console.error("Fetching favorites:", error);
      res.status(500).json({ error: "Fetching favorites error" });
    }
  }

  static async getIdsList(req, res) {
    try {
      const favoritesList = await FavoritesDBService.getIdsList(req.user.id);
      res.json(favoritesList);
    } catch (error) {
      console.error("Fetching favorites:", error);
      res.status(500).json({ error: "Fetching favorites error" });
    }
  }
}
export default FavoritesController;
