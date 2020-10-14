import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService { 

constructor(private readonly jwtService:JwtService,@InjectModel('User') private userModel: Model<User>,private userService:UsersService){}
async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password,phone,Role } = authCredentialsDto;
    let email2 ;
    await this.getuserByEmail(email).then(res=>{email2=res});
  if (null==email2){
    const hashedPassword = await bcrypt.hash(password, 10);
    let sondages =[];
    const user = new this.userModel({ email, password: hashedPassword ,phone,Role,sondages});
      await user.save().then(res=>{console.log(res)});
      return user;
        
  }else 
  return "Utilisateur existant"
  }


  async signIn(user: User) {
   let users :any;
   await this.getuserByEmail(user.email).then( res=>{users =res});
   user.save();
   const payload = { email: users.email,phone:users.phone,password:users.password,role:user.Role, sub: users._id };
    return {
      _id:users._id,
      accessToken: this.jwtService.sign({payload}),
    };
  }
  async getuserByEmail(email:string) {
    
    return  this.userModel.findOne({email:email});
  }
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
  decode(auth: string): {uuid: string}{
    const jwt = auth.replace('Bearer ', '');
    return this.jwtService.decode(jwt, { json: true }) as { uuid: string };
}
}
