class MenuItem {
  readonly id: number;
  readonly count: number;
  readonly comment?: string;
}

export class CreateOrderDto {
  menus: MenuItem[];
}
