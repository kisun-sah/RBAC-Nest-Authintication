import { Role } from './enums/roles.enum';
// src/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private jwtService: JwtService) {}

async register(email: string, password: string, role: string) {
  const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new BadRequestException('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return this.prisma.user.create({
    data: {
      email,
      hash: hashedPassword,  
      role,
    },
  });
}

async validateUser(email: string, password: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.hash);  // <-- use 'hash' here
  if (!isPasswordValid) return null;

  return user;
}


  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
