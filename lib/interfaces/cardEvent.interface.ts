import { SameVoteType } from './publications.interface';

export interface CardEvent {
  imageUrl: string;
  name: string;
  description: string;
  url: string;
  votos: number;
  reference_link: string;
  publication_id: string;
  same_vote: SameVoteType[];
}
