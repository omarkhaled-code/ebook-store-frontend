export type User = {

  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  email_verified_at: string | null;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};
