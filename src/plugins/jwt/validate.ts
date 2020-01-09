import { Request } from '@hapi/hapi';

interface ValidationResult {
    isValid: boolean;
    credentials: any;
}

export default async function (decoded: any, request: Request): Promise<ValidationResult> {
    if (!request.headers || !request.headers.authorization) {
        return {
            isValid: false,
            credentials: decoded,
        };
    }

    // request foe session data


    // should be changed
    return {
        isValid: false,
        credentials: decoded,
    };
}
