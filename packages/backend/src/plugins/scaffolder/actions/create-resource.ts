import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

export const createNewResourceAction = () => {
    return createTemplateAction<{ resourceType: string; resourceName: string }>({
      id: 'custom:resource:create',
      schema: {
        input: {
          required: ['resourceType', 'resourceName'],
          type: 'object',
          properties: {
            resourceType: {
              type: 'string',
              title: 'Recurso',
              description: 'O tipo de recurso a ser criado (ex: Bucket S3)',
            },
            resourceName: {
              type: 'string',
              title: 'Nome do recurso',
              description: 'O nome que irá ser exibido no CLoud Provider',
            },
          },
        },
      },
      async handler(ctx) {
        ctx.logger.info(
            `Se você está vendo isso é porque deu bom! =)`
        );
        ctx.logger.info(
            `O recurso ${ctx.input.resourceName} de nome ${ctx.input.resourceType} foi criado com sucesso!`
        );

        ctx.output('motivacional', 'https://inspirobot.me/')
      },
    });
};