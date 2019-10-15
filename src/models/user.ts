import Base from './base';

// will be extended
interface UserEntity {
    id: string;
    username: string;
    password: string;
    email: string;
}

class User extends Base<UserEntity> {
}

export default User;