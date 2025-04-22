import { IsInt, IsPositive, IsString, Min, MinLength} from "class-validator";

export class CreatePokedexDto {

    @IsPositive()
    @IsInt()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    name: string;

}
