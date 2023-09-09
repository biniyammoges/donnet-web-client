export class AuthResponse {
     accessToken?: string;
     refreshToken?: string;

     constructor(data: Partial<AuthResponse>) {
          Object.assign(this, data)
     }
}

export class ExceptionResponse {
     statusCode?: number;
     message?: string;

     constructor(data: Partial<ExceptionResponse>) {
          Object.assign(this, data)
     }
}

export interface LoginDto {
     emailOrUsername: string;
     password: string;
}

export interface RegisterDto {
     username: string;
     email: string;
     password: string;
     confirmPassword: string;
     firstName: string;
     lastName: string;
     dateOfBirth: Date;
     bio?: string;
}

export interface UpdateMeDto {
     firstName: string;
     lastName: string;
     username: string;
     email: string;
     password: string;
     birthDate?: String;
     bio?: string
}