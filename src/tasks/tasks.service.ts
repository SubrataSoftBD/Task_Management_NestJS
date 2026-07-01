import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './create.task.dto';


@Injectable()
export class TasksService {
  private tasksList: TaskModel[] = [];

  getAllTask(): TaskModel[] {
    return this.tasksList;
  }

  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = createTaskDto;
    const tasks: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasksList.push(tasks);
    return tasks;
  }
}
