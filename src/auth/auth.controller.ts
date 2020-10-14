import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as jwt_decode from 'jwt-decode';


@Controller('auth')
export class AuthController {
    
constructor(private authService: AuthService,private userservice : UsersService) {}

@Post('/signup')
async signUp(
  @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
): Promise<void> {
  return await this.authService.signUp(authCredentialsDto);
}

@Post('signin')
async signIn(@Request()req:any ) {
  return this.authService.signIn(req.body);
}


@Get('me')
async getMe(@Request() req) {
 let headerDecode=  await this.authService.decode(req.headers.authorization);
 console.log(headerDecode);

 return headerDecode
}
}
