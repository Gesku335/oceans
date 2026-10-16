import { IsEmail, IsPhoneNumber, IsOptional, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RequestOtpDto {
  @ApiPropertyOptional({ example: 'user@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+79001234567' })
  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;
}