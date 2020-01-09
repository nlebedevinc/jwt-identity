import { DbContext, DbSet } from './db/base';

class IdentityContext extends DbContext {
    readonly users = new DbSet<any>(this.pool);
    readonly sessions = new DbSet<any>(this.pool);
}

export default IdentityContext;
