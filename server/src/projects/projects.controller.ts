import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectDto: CreateProjectDto) {
    
    return this.projectsService.create(createProjectDto);
  }
  @Get()
  findAll(@Param() params: {limit?: number, offset?: number}) {
    const limit = params.limit || 10;
    const offset = params.offset || 0;

    return this.projectsService.findAll(limit, offset);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
