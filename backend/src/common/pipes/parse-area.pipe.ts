import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from "@nestjs/common";
import { Area } from "../../orders/order.types";

const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;

@Injectable()
export class ParseAreaPipe implements PipeTransform<string, Area> {
  transform(value: string, metadata: ArgumentMetadata): Area {
    const normalised = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    
    if (!AREAS.includes(normalised as Area)) {
      throw new BadRequestException(
        `${metadata.data} must be one of: ${AREAS.join(", ")}`,
      );
    }
    
    return normalised as Area;
  }
}
