import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { ResourceLimits } from "worker_threads";

export class PaginationDto{

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsPositive()
    offset: number;
}