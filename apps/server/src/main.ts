import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

import { AppModule } from './app/app.module';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const MongoStore = MongoDBStore(session);
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
      store: new MongoStore({
        uri: process.env.MONGO_URI,
        databaseName: 'discord',
        collection: 'session',
      }),
    })
  );
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  const port = process.env.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
