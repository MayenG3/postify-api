import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCommentInput) {
    return this.prisma.comment.create({ data });
  }

  findAll() {
    return this.prisma.comment.findMany({
      where: { is_active: true },
      include: { user: true, post: true },
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { user: true, post: true },
    });
  }

  update(id: number, data: UpdateCommentInput) {
    return this.prisma.comment.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.comment.update({
      where: { id },
      data: { is_active: false },
    });
  }
}
