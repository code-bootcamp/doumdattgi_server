import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CommentsService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.createComment({
      createCommentInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Comment])
  async fetchComments(
    @Args('request_id') request_id: string,
  ): Promise<Comment[]> {
    return this.commentsService.findComments({
      request_id,
    });
  }
}
