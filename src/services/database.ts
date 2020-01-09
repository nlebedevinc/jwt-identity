import { PoolConfig, Pool } from "pg";

class DbFactory {
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

// db.Users

abstract class DbContext {
    constructor(protected pool: Pool) {}
}

class DbSet<T> {
    constructor(private pool: Pool) {}

    add(entity: T) {
        
    }
}

class MyContext extends DbContext {
    readonly users = new DbSet<any>(this.pool);
    readonly sessions = new DbSet<any>(this.pool);
}

export default DbFactory;
