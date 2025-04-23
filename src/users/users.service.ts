import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({ 
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
  
  async update(id: number, data: UpdateUserInput) {
    const updatedData = { ...data };
  
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }
  
    return this.prisma.user.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { is_active: false },
    });
  }
}
