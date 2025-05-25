export class TourDto {
    readonly name: string;
    readonly description: string;
    readonly operator: string;
  
    constructor(name: string, description: string, operator: string) {
      this.name = name;
      this.description = description;
      this.operator = operator;
    }
  }
  