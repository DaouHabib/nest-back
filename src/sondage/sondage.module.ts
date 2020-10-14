import { Module } from '@nestjs/common';
import { SondageService } from './sondage.service';
import { SondageController } from './sondage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SondageSchema } from './schema/Sondage.model';
import { UsersModule } from '../../dist/users/users.module';

@Module({
  imports:[    MongooseModule.forFeature([{ name: 'Sondage', schema: SondageSchema }]),UsersModule],

  providers: [SondageService],
  controllers: [SondageController],
  exports:[SondageService]
})
export class SondageModule {}
