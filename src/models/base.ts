import { Pool, PoolClient } from 'pg';

abstract class Base<T> {
    constructor(protected pool: Pool, protected name: string) { }

    protected connect(): Promise<PoolClient> {
        return this.pool.connect();
    }

    // should be a declared interface here
    async getById(id: string): Promise<T | null> {
        const client = await this.connect();
        const query = `SELECT * from ${this.name} WHERE id = $1`;

        try {
            const result = await client.query(query, [id]);
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}

export default Base;
