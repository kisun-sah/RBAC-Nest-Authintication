import { underline } from './../../node_modules/@colors/colors/index.d';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { dot } from 'node:test/reporters';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

   async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // Remove hash before returning user
      // const { hash: _, ...userWithoutHash } = user;
    return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

 async signin() {
  return " this is a signin"

}
}