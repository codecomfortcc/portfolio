import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { CreateProjectDto } from "./dto/create-project.dto";
import { InjectDb } from "src/drizzle/drizzle.provider";
import { Injectable } from "@nestjs/common";
import * as schema from "src/drizzle/schemas/index";
import { eq } from "drizzle-orm";
import { UpdateProjectDto } from "./dto/update-project.dto";


@Injectable()
export class ProjectsService {
  constructor(
    @InjectDb() private readonly db: NeonHttpDatabase<typeof schema>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const result = await this.db.insert(schema.projects).values(createProjectDto).returning();
    return result[0]; 
  }

  async findAll(limit: number, offset: number) {
    return this.db.select().from(schema.projects).limit(limit).offset(offset);
  }
  
  async findOne(id: string) {
    const result = await this.db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return result[0];
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {

    const result = await this.db.update(schema.projects)
      .set(updateProjectDto)
      .where(eq(schema.projects.id, id))
      .returning();
    return result[0];
  }

  async remove(id: string) {

    const result = await this.db.delete(schema.projects)
      .where(eq(schema.projects.id, id))
      .returning();
    return result[0];
  }
}
