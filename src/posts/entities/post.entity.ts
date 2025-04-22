import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Int)
  user_id: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field(() => User)
  user: User;

  @Field(() => [Comment], { nullable: true })
  comment?: Comment[];
}
