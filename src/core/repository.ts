
export type BaseRepositoryType<T> = {
    create(payloar: Partial<T>): T;
    save(entity: T): T;
    findById(identifier: number | string): T | undefined;
    findAll(): T[];
    delete(id: number | string): void;
}
