import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Trae todos los usuarios
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Buscar un usuario por ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${id} no encontrado`,
      );
    }

    return user;
  }

  // Crear un usuario
  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const nuevoUsuario = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return await this.userRepository.save(nuevoUsuario);
  }

  // Eliminar un usuario por ID
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuario con id ${id} no encontrado`,
      );
    }
  }

  // Actualizar un usuario
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con id ${id} no encontrado`,
      );
    }

    // Si se está actualizando la contraseña,
    // se vuelve a encriptar.
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        10,
      );
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }
}



//Petición HTTP (curl / Swagger / Postman)
        
//users.controller.ts   (recibe, captura datos, define la ruta)
        
//users.service.ts      (ejecuta la acción real contra PostgreSQL con el Repository)
        
//respuesta de vuelta al usuario