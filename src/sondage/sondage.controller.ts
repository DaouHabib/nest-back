import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Sondagedto } from './dto/createSondagedto';
import { SondageService } from './sondage.service';

@Controller('sondage')
export class SondageController {
    
constructor(private readonly sondageService: SondageService)
{}

@Post()
async addsondage(
    @Body(ValidationPipe) sondageDto: Sondagedto,
   
    ): Promise<any> {
      return await this.sondageService.insertSondage(sondageDto);
}

@Get()
async getAllSondages() {
  const sondages = await this.sondageService.getSondages();
  return sondages;
}

@Get(':id')
getSondage(@Param('id') sondageId: string) {
  return this.sondageService.getSondagebyID(sondageId);
}

@Get('total/:id')
totalSondage(@Param('id') sondageId: string) {
  return this.sondageService.totalevoteBysondage(sondageId);
}
@Put(':id')
async updateSondagequestion(
  @Param('id') userId: string,
  @Body('question') question: string,
  

) {
 let sondage= await this.sondageService.updatequestionSondage(userId,question);
  return sondage;
}
@Put('vote/:id')
async voteSondage(
  @Param('id') sondageId: string,
  @Body('userid') userId: string,
  @Body('oui') oui: number,
  @Body('non') non: number,

) {
 let sondage= await this.sondageService.updateSondage(sondageId, oui, non,userId);
  return sondage;
}
@Put('reset/:id')
async resetSondage(
  @Param('id') userId: string,

) {
 let sondage= await this.sondageService.setvoteNullSondage(userId);
  return sondage;
}
@Delete(':id')
async removeProduct(@Param('id') sondageId: string) {
  let result= await this.sondageService.deleteSondage(sondageId);
    return result;
}
@Get('last/:userid')
getlastSondages(@Param('userid') userId: string) {
  return this.sondageService.getlastPosts(userId);
}
@Get('best/:userid')
getbestSondage(@Param('userid') userId: string) {
  return this.sondageService.getbestPosts(userId);
}
}
