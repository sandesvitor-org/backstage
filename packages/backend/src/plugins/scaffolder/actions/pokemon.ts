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
        ctx.logger.info(`Buscando o pokemon [${ctx.input.pokemon}] no PokeAPI...`);

        const pokemonOfficialArtworkURL = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ctx.input.pokemon}`)
          .then(response => response["data"]["sprites"]["other"]["official-artwork"]["front_default"])

        ctx.logger.info(`URL: ${pokemonOfficialArtworkURL}`)

        ctx.output('pokemonUrl', pokemonOfficialArtworkURL)
      },
    });
};