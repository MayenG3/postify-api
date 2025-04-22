import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  lastname: string;

  @Field({ nullable: true })
  profile_pic?: string;
}
