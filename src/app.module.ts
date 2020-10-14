import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { SondageModule } from './sondage/sondage.module';

@Module({
  imports: [ 
    UsersModule,  
    AuthModule,
    ProductsModule,
    SondageModule,
    MongooseModule.forRoot(
      'mongodb+srv://habib:mdrlol23@cluster0.p9vp7.mongodb.net/nestjs?retryWrites=true&w=majority',
    ),
   

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
