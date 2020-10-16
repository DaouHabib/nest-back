import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './schema/useres.model';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: "habib",
      signOptions: { expiresIn: '600s' },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.office365.com',
        service:"gmail",
        port: 587,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user:"nolivetg@gmail.com", // generated ethereal user
          pass: "mdrlol123", // generated ethereal password
        },
      },
      defaults: {
        from: '"nest-modules" <nolivetg@gmail.com>', // outgoing email ID
      },
    
    }),
      
  ],
  exports:[UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
