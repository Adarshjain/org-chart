export interface Employee {
  id: number;
  name: string;
  team?: string;
  manager?: number;
  designation: string;
  avatar: string;
}

export type RecursiveType<T> = T & { reporters: RecursiveType<T>[], hasDeeperChildren: boolean }
