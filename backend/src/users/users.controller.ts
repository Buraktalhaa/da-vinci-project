import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // GET /users
    @Get()
    findAll(): User[] {
        return this.usersService.findAll();
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            return this.usersService.findOne(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { status: 404, message: error.message };
            }
            throw error;
        }
    }

    // POST /users
    @Post()
    create(@Body() userData: Omit<User, 'id'>) {
        const newUser = this.usersService.create(userData);
        return { status: 201, message: 'User created', data: newUser };
    }

    // PUT /users/:id
    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
        try {
            const updatedUser = this.usersService.update(id, updateData);
            return { status: 200, message: 'User updated', data: updatedUser };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { status: 404, message: error.message };
            }
            throw error;
        }
    }

    // DELETE /users/:id
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            this.usersService.remove(id);
            return { status: 200, message: 'User deleted' };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { status: 404, message: error.message };
            }
            throw error;
        }
    }
}
