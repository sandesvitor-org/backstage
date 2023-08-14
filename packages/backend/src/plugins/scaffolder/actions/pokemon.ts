import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import axios from 'axios'

export const pokemonAction = () => {
    return createTemplateAction<{ pokemon: string; }>({
      id: 'custom:pokemon',
      schema: {
        input: {
          required: ['pokemon'],
          type: 'object',
          properties: {
            pokemon: {
              type: 'string',
              title: '',
              description: 'O nome do pokemon a ser buscado',
            }
          },
        },
      },
      async handler(ctx) {
        const pokemon = ctx.input.pokemon.toLowerCase().trim()

        ctx.logger.info(`Buscando o pokemon [${pokemon}] no PokeAPI...`);

        const pokemonOfficialArtworkURL = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then(response => response["data"]["sprites"]["other"]["official-artwork"]["front_default"])

        ctx.logger.info(`URL: ${pokemonOfficialArtworkURL}`)

        ctx.output('pokemonUrl', pokemonOfficialArtworkURL)
      },
    });
};