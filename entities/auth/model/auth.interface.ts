export interface LoginResponse {
	access_token: string | null;
}

export interface LoginRequest {
	email: string;
	password: string;
}
