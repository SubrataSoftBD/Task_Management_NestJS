import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskModel } from '../../dist/tasks/task.model';
import { CreateTaskDto } from './create.task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTask(): TaskModel[] {
    return this.tasksService.getAllTask();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.tasksService.createTask(createTaskDto);
  }
}
