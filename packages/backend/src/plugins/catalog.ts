import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import { GithubOrgEntityProvider, GithubOrgReaderProcessor } from '@backstage/plugin-catalog-backend-module-github';
import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addEntityProvider(
    GithubOrgEntityProvider.fromConfig(env.config, {
      id: 'development',
      orgUrl: 'https://github.com/sandesvitor-org',
      logger: env.logger,
      schedule: env.scheduler.createScheduledTaskRunner({
        frequency: { minutes: 60 },
        timeout: { minutes: 15 },
      }),
    }),
  );
  builder.addProcessor(
    GithubOrgReaderProcessor.fromConfig(env.config, { logger: env.logger }),
    new ScaffolderEntitiesProcessor(),
  );
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
