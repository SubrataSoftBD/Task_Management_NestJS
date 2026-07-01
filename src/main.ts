import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  const logger = new Logger('Routes');
  const baseUrl = `http://localhost:${port}`;
  const expressApp = app.getHttpAdapter().getInstance();
  const router = expressApp.router ?? expressApp._router;
  const stack: any[] = router?.stack ?? [];

  const routes = stack.filter((layer) => layer.route);
  if (routes.length === 0) {
    logger.warn('No routes registered. Add HTTP method decorators (@Get, @Post, ...) to controller methods.');
  }
  routes.forEach((layer) => {
    const path = layer.route?.path;
    const methods = Object.keys(layer.route.methods)
      .map((m) => m.toUpperCase())
      .join(',');
    logger.log(`${methods} ${baseUrl}${path}`);
  });
}
bootstrap();
