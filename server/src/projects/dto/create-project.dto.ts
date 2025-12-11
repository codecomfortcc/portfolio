import { IsString, IsOptional, IsEnum, IsArray, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export enum CurrentStatus {
  DEVELOPMENT = 'development',
  COMPLETED = 'completed',
  PLANNING = 'planning',
  PAUSED = 'paused',
  DEPRECATED = 'deprecated',
}

export enum FutureStatus {
  MAINTAINED = 'maintained',
  UNMAINTAINED = 'unmaintained',
  COMMUNITY = 'community',
  ARCHIVED = 'archived',
  NONE = 'none',
}

class TechnologyDto {
  @IsString()
  name: string;

  @IsString()
  icon: string; 
}

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsEnum(CurrentStatus)
  currentStatus: CurrentStatus;

  @IsEnum(FutureStatus)
  futureStatus: FutureStatus;

  @IsString()
  imageSrc: string;

  @IsString()
  @IsOptional()
  alt?: string;

  @IsUrl()
  repo: string;

  @IsUrl()
  @IsOptional()
  demo?: string;

  @IsString()
  @IsOptional()
  accent?: string;

  @IsString()
  @IsOptional()
  bg?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TechnologyDto)
  technologies: TechnologyDto[];
}


