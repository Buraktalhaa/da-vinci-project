import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';

export interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(private readonly usersService: UsersService) {
    const users = this.usersService.findAll();
    if (users.length >= 2) {
      this.posts = [
        { id: uuidv4(), userId: users[0].id, title: 'First Post', body: 'This is the first post' },
        { id: uuidv4(), userId: users[1].id, title: 'Second Post', body: 'This is the second post' },
      ];
    }
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(postData: Omit<Post, 'id'>): Post {
    // userId geçerli mi kontrol et
    this.usersService.findOne(postData.userId);

    const newPost: Post = { id: uuidv4(), ...postData };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: string, updateData: Partial<Omit<Post, 'id'>>): Post {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Post not found');

    if (updateData.userId) {
      this.usersService.findOne(updateData.userId);
    }

    this.posts[index] = { ...this.posts[index], ...updateData };
    return this.posts[index];
  }

  remove(id: string): void {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    this.posts = this.posts.filter((p) => p.id !== id);
  }

  findByUserId(userId: string): Post[] {
    return this.posts.filter((p) => p.userId === userId);
  }
}
