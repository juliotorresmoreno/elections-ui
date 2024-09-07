

export type Credentials = {
  email: string;
  password: string;
};

export type User =  {
  id: number,
  full_name: string,
  email: string,
  created_at: string,
  updated_at: string,
}

export type Session =  {
  token: string,
  user: User,
}

export type PoliticalParty = {
  id: number;
  name: string;
  abbreviation: string;
  foundation_date: string;
  ideology: string;
  description: string;
  logo: string;
};

export interface Candidate {
  id: number;
  name: string;
  last_name: string;
  identification: string;
  contact_info: string;
  photo: string;
  political_party_id: number;
  position: string;
  experience: string;
  biography: string;
  education: string;
  campaign_platform: string;
};

export type Campaign = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
};