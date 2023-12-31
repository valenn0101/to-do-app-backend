import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDTO, UserDTO } from '../dto/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorator/public.decotator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @Post('add-to-project')
  public async addUserToProject(@Body() body: any) {
    return await this.usersService.relationToProject(body);
  }

  @Get('all')
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @Get(':userId')
  public async findUserById(@Param('userId', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @Put('edit/:userId')
  public async updateUser(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @Delete('delete/:userId')
  public async deleteUser(@Param('userId', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
