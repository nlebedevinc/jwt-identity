import { PoolConfig, Pool } from 'pg';

export class DbFactory {
    static create(config: PoolConfig): Pool {
        // initialize db connection
        return new Pool(config);
    }

    static async destroy(pool: Pool): Promise<void> {
        console.log('calling end');
        await pool.end();
        console.log('pool has drainded');
    }
}

export abstract class DbContext {
    constructor(protected pool: Pool) {}
}

export class DbSet<T> {
    constructor(private pool: Pool) {}

    add(entity: T) {
        
    }

    update(entity: T) {
        
    }

    find(): T {

    }

    findMany(): T[] {

    }
}

export default DbFactory;
