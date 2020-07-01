import { PublicUser } from "./../types";
import { SignUpDto } from "./dto/signUp.dto";
import { AuthService } from "./auth.service";
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from "@nestjs/common";
import { LocalAuthGuard } from "./localAuth.guard";
import { ReqWithUser } from "../interfaces";
import { Response } from "express";
import JwtAuthGuard from "./jwtAuth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  async signUp(@Body() signUpDto: SignUpDto): Promise<PublicUser> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  async signIn(
    @Req() req: ReqWithUser,
    @Res() res: Response,
  ): Promise<PublicUser> {
    const { user } = req;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    res.setHeader("Set-Cookie", cookie);
    delete user.passwordHash;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("sign-out")
  signOut(@Req() req: ReqWithUser, @Res() res: Response): Response {
    res.setHeader("Set-Cookie", this.authService.getCookieForSignOut());
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() req: ReqWithUser): PublicUser {
    const { user } = req;
    console.log(user);
    delete user.passwordHash;
    return user;
  }
}
