export interface UserMeResponse {
  results: UserMe;
}

export interface UserMe {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  image_url: string | null;
  profiles: Profile[];
}

export interface Profile {
  id: string;
  user_id: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}
