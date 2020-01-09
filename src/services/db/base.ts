import { Pool } from 'pg';

export abstract class DbContext {
    constructor(protected pool: Pool) {}
}

export class DbSet<T> {
    constructor(protected readonly pool: Pool) {}

    add(entity: T): void {
        
    }

    update(entity: T): void {

    }

    findOne(): T {

    }

    findMany(): T[] {
        
    }
}

export default DbFactory;
