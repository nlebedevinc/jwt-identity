import { PoolConfig, Pool } from "pg";

class Database {
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

export default Database;
