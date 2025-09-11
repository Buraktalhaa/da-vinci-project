import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';


export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: uuidv4(), name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
    { id: uuidv4(), name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: uuidv4(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateData: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException("User not found");

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
    };

    return this.users[userIndex];
  }

  remove(id: string): void {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException("User not found");
    this.users = this.users.filter(u => u.id !== id);
  }
}