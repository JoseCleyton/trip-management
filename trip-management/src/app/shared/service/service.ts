export interface Service {
  add: (data: unknown) => unknown;
  findAll: () => unknown;
  findById: (id: string) => unknown;
  edit: (data: unknown) => unknown;
  delete: (id: string) => unknown;
}
