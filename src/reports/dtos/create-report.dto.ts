import { IsEmail, IsString, IsNumber, Min, Max, IsLongitude, IsLatitude } from "class-validator";

export class CreateReportDto {
    @IsNumber()
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;  

    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number;

    @IsLongitude()
    lng: number;
    
    @IsString()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;   
}