import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Sondage } from '../sondage/interfaces/Sondage.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

constructor(private readonly useresService: UsersService)
{}
@Get("sendEmail")
  sendMail( @Body('email') email: string): any {
    return this.useresService.sendEmail(email);
  }

@Post()
async adduser(
  @Body('email') email: string,
  @Body('password') password: string,
  @Body('phone') phone: number,
) {
  const generatedId = await this.useresService.insertUser(
    email,
    password,
    phone,
  );
  return { id: generatedId };
}

@Get()
async getAllUsers() {
  const products = await this.useresService.getUsers();
  return products;
}

@Get(':id')
getProduct(@Param('id') userId: string) {
  return this.useresService.getUserbyID(userId);
}

@Put(':id')
async updateProduct(
  @Param('id') userId: string,
  @Body('email') email: string,
  @Body('phone') phone: number

) {
 let user= await this.useresService.updateUser(userId, email, phone);
  return user;
}

@Delete(':id')
async removeProduct(@Param('id') userId: string) {
    await this.useresService.deleteUser(userId);
    return null;
}
@Get('test')
async test(@Param('id') userId: string) {
let date :Date;
  let result=  await this.useresService.LastSondages(userId,date);
    return result;
}

}
