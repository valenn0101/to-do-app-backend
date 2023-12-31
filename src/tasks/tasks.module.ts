import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';
import { ProjectsEntity } from '../projects/entity/projects.entity';
import { ProjectsService } from '../projects/service/projects.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TasksEntity, ProjectsEntity]),
    UsersModule,
  ],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
})
export class TasksModule {}
