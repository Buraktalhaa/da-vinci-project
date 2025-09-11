import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { PostsService, Post as PostEntity } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts
  @Get()
  findAll(): PostEntity[] {
    return this.postsService.findAll();
  }

  // GET /posts/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postsService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      throw error;
    }
  }

  // POST /posts
  @Post()
  create(@Body() postData: Omit<PostEntity, 'id'>) {
    try {
      const newPost = this.postsService.create(postData);
      return { status: 201, message: 'Post created', data: newPost };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: 'User for this post not found' };
      }
      throw error;
    }
  }

  // PUT /posts/:id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Omit<PostEntity, 'id'>>) {
    try {
      const updatedPost = this.postsService.update(id, updateData);
      return { status: 200, message: 'Post updated', data: updatedPost };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      throw error;
    }
  }

  // DELETE /posts/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      this.postsService.remove(id);
      return { status: 200, message: 'Post deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { status: 404, message: error.message };
      }
      throw error;
    }
  }

  // GET /posts/user/:userId
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.postsService.findByUserId(userId);
  }
}
