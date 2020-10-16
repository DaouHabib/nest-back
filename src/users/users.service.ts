import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Sondagedto } from '../sondage/dto/createSondagedto';
import { Sondage } from '../sondage/interfaces/Sondage.interface';
import { Userdto } from './dto/createuserdto';
import { User } from './interfaces/user.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  private readonly users: Userdto[];

  constructor(@InjectModel('User') private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {

  }

  async insertUser(email: string, password: string, phone: number) {
    let newUser: any;
    let result: any;

    result = newUser.save();
    return result.id as string;
  }
  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      Role: user.Role
    }));
  }

  private async findUser(userId: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    } catch (error) {
      throw new NotFoundException('Could not find User.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }


  async getUserbyID(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      phone: user.phone,
      Role: user.Role,
      sondages: user.sondages
    };
  }
  async updateUser(
    id: string,
    email: string,
    phone: number,
    password:string

  ) {
    const updatedUser = await this.findUser(id);
    if (email) {
      updatedUser.email = email;
    }

    if (phone) {
      updatedUser.phone = phone;
    }
    if (password){
      updatedUser.password=await bcrypt.hash(password, 10);
    }

    updatedUser.save();
    return updatedUser;
  }
  async updateSondage(
    userId: string, user: any
  ) {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user);

    console.log("UPdated");
  }
  async updatesondage2(
    id: string,
    sondage: Sondage

  ) {
    const updatedUser = await this.findUser(id);
    if (sondage) {
      updatedUser.sondages.push(sondage);
    }
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(Id: string) {
    const result = await this.userModel.deleteOne({ _id: Id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find User.');
    }
  }


  async LastSondages(idUser: string, date: Date) {
    const result = await this.userModel.findById(idUser);
    return result.sondages.slice(-2);
  }
  async sendEmail(email: string) {
    let user = await this.userModel.findOne({ email: email });
    if (!user) return "Error";
    const payload = { email: user.email, phone: user.phone, password: user.password, role: user.Role, sub: user._id };
    let token = this.jwtService.sign({ payload });
    console.log(token);
    this
      .mailerService
      .sendMail({
        to: user.email, // List of receivers email address
        from: 'nolivetg@gmail.com', // Senders email address
        subject: 'Reset Password',
        text: 'welcom to ower application if you need to navigate to http://localhost:4200/authentication/forgotPassword/' + token,
      })
      .then((success) => {

        console.log(success)
      })
      .catch((err) => {

        console.log(err)
      });
  }
}
