import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// De @nestjs/common: decoradores para definir las rutas HTTP
// (Get, Post, Delete, Patch), tomar datos de la URL (Param)
// y recibir datos del cuerpo de la petición (Body).

import {
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// De @nestjs/swagger: decoradores que generan la documentación
// de la API en Swagger.

import { UsersService } from '../services/users.service';

// UsersService contiene la lógica de los usuarios.

import { CreateUserDto } from '../dtos/create-user.dto';

// CreateUserDto define la estructura de los datos
// necesarios para crear un usuario.

import { UpdateUserDto } from '../dtos/update-user.dto';

// UpdateUserDto define la estructura de los datos
// necesarios para actualizar un usuario.


@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
    // Inyección de dependencias:
    // NestJS nos entrega una instancia de UsersService
    // lista para utilizar, sin tener que hacer new UsersService().
  }


  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por id' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por id' })
  @ApiParam({ name: 'id' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por id' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
//primero pasa por user.controller.ts que eschupa la peticion que alla echo el usuario que llegen a /users
//despues recoje los datos que allan sido mandados por la (URL o del cuerpo del mensaje)
//despues se lo manda a usersService quien resive la petecion de la dase de datos y lo devuelve la respuesta que alla mandado el service