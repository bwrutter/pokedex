import api from "./api";

const PokeService = {
  async getData(endpoint) {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados da PokéAPI:", error);
      throw error;
    }
  },

  async getPokemon(nameOrId) {
    return await PokeService.getData(`pokemon/${nameOrId}`);
  },

  async getType(nameOrId) {
    return await PokeService.getData(`type/${nameOrId}`);
  },
};

export default PokeService;
