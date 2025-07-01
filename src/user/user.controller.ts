// src/user/user.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorater/roles.decorator';
import { Role } from '../auth/enums/roles.enum';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('user')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  @Get('profile')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  getProfile(@Request() req) {
    return { message: 'Any authenticated user', user: req.user };
  }

  @Get('admin-data')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  getAdminData(@Request() req) {
    return { message: 'Only Admin and SuperAdmin', user: req.user };
  }

  @Get('superadmin-data')
  @Roles(Role.SUPERADMIN)
  getSuperAdminData(@Request() req) {
    return { message: 'Only SuperAdmin', user: req.user };
  }

  @Get('list')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  async getAllUsers(@Request() req) {
    const role = req.user.role;
    const userId = req.user.userId;

    if (role === Role.SUPERADMIN) {
      return await prisma.user.findMany();
    }

    if (role === Role.ADMIN) {
      return await prisma.user.findMany({
        where: {
          role: Role.USER,
        },
      });
    }

    if (role === Role.USER) {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    }
  }
}
