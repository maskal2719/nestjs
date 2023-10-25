class MenuItem {
  readonly id: number;
  readonly count: number;
  readonly comment?: string;
  readonly status: string;
}

export class CreateOrderDto {
  menus: MenuItem[];
}
