import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
//De @nestjs/common: los decoradores para definir rutas 
//(Get, Post, Delete), para tomar datos de la URL (Param) y del cuerpo de la petición (Body)

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
//De @nestjs/swagger: los decoradores que generan la documentación
import { UsersService } from '../services/users.service';
//El UsersService (la lógica real) y el CreateUserDto (la forma que debe tener el JSON al crear un usuario)
import { CreateUserDto } from '../dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //inyección de dependencias: le pido a NestJS
        // que me dé una instancia de UsersService ya lista para usar, sin tener que crearla yo mismo con new.

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

 //Esta parte recibe la petición HTTP POST /users con el JSON que mandas, y se lo pasa al Service.
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

 //Recibe la petición DELETE /users/:id, toma el id de la URL y se lo pasa al Service.
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