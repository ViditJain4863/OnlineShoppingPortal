export class User {
    id?: number;
    firstName?:string;
    lastName?:string;
    emailAddress?:string;
    username?: string;
    mobileNumber?:string;
    password?: string;
    role?:string;
    gender?:string;
    country?:string;
    pincode?:string;
    userUpdateDate?:string;
    token?: string; 
}

export class TokenResponse {
    userName?: string;
    token?: string;
    // role?:string;
}