
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // You can add providers, controllers, and imports here as needed
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule{}