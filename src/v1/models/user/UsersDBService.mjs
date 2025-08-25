import CRUDManager from "../CRUDManager.mjs";

class UsersDBService extends CRUDManager {
  async getList() {}
}

export default new UsersDBService("users");
