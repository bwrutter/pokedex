<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <div class="celular">
      <div class="tela">
        <div class="barra-superior">
          <div class="notificacao"></div>
          <div class="camera"></div>
        </div>
        
        <div class="conteudo"> 
          <v-container>
            <v-text-field 
              v-model="search" 
              label="Buscar Pokémon" 
              prepend-inner-icon="mdi-magnify" 
              variant="solo-filled" 
              hide-details 
              single-line
              density="compact"
              @keyup.enter="fetchPokemon" 
              @click:prepend-inner="fetchPokemon"
            ></v-text-field>
            <div v-if="error" class="error-message">
              Pokémon não encontrado! Tente novamente.
            </div>
          </v-container>

          <v-row class="ma-1" v-if="pokemon">
            <v-col>
              <v-card class="mx-auto" max-width="250" height="400" style="background-color: #d9ddd0;">
                <v-img height="220px" :src="pokemon?.sprites.front_default"></v-img>
                <v-card-title class="text-capitalize">{{ pokemon.name }}</v-card-title>
                <v-card-subtitle class="text-capitalize">Tipo: {{ pokemon.types[0].type.name }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>

        </div>

        <div class="barra-inferior">
          <div class="botao"></div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { ref } from "vue";
import PokeService from "@/services/pokedexService";

export default {
  setup() {
    const search = ref("");
    const pokemon = ref(null);
    const error = ref(null);
    const show = ref(false);

    const fetchPokemon = async () => {
      if (!search.value) return;

      try {
        error.value = null;
        pokemon.value = await PokeService.getPokemon(search.value.toLowerCase());

        if (!pokemon.value) {
          error.value = "Pokémon não encontrado!";
        }

        console.log(pokemon.value)
      } catch (err) {
        error.value = "Erro ao buscar Pokémon!";
        pokemon.value = null;
      }
    };

    return { search, pokemon, error, fetchPokemon, show };
  },
};
</script>
<style>
.celular {
  width: 300px;
  height: 600px;
  border-radius: 20px;
  background-color: #f0f0f0;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.tela {
  width: 100%;
  height: 100%;
  background-color: #d9ddd0;
}

.barra-superior {
  width: 100%;
  height: 30px;
  background-color: #e4605e; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.notificacao {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: purple;
}

.camera {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #7bf9e9;
}

.conteudo {
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  background-color: #d9ddd0;
  padding: 10px;
}

.barra-inferior {
  width: 100%;
  height: 30px;
  background-color: #e4605e; 
  display: flex;
  justify-content: center;
  align-items: center;
}

.botao {
  width: 50px;
  height: 20px;
  border-radius: 50px;
  background-color: #ccc;
}
</style>