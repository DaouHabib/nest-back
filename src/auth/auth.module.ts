import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {JwtModule}from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schema/useres.model';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../../dist/users/users.module';
@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  PassportModule,
  UsersModule,
  JwtModule.register({
    secret: "habib",
    signOptions: { expiresIn: '60s' },
  }),


    
  ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
