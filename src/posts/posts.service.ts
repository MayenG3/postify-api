import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePostInput) {
    return this.prisma.post.create({ data });
  }

  findAll() {
    return this.prisma.post.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'desc' },
      include: {
        user: true,
        comment: {
          orderBy: { created_at: 'desc' },
          include: {
            user: true,
          },
        },
      },
    });
  }
  

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { user: true, comment: true },
    });
  }

  update(id: number, data: UpdatePostInput) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.post.update({
      where: { id },
      data: { is_active: false },
    });
  }
}
