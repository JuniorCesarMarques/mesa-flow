export type Session = {
	id: string;
    user_id: string;
	tokenHash: string;
	expiresAt: Date;
	createdAt: Date;
}