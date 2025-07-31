export interface LoginResponseModel {
    token: string;  // JWT token for authentication     
    email: string;  // Email of the user
    roles: string[]; // Array of roles assigned to the user
}