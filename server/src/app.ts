import fastify from 'fastify';
import { registerCorePlugins } from './core/plugins';
import { registerModules } from './modules';

const app = fastify({ logger: true });

registerCorePlugins(app);
registerModules(app);

const start = async () => {
  const port = Number(process.env.PORT ?? 3000);
  await app.listen({ port, host: '0.0.0.0' });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});
