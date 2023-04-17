import { Publication } from '../interfaces/publications.interface';

export const publicationToCardEvent = (publication: Publication) => {
  const img = publication.images[0]?.image_url || '';

  return {
    imageUrl: img,
    name: publication.title,
    description: publication.description,
    url: `/category/${publication.publication_type_id}/details/${publication.id}`,
    votos: publication.votes_count,
    reference_link: publication.reference_link,
  };
};

export const calculateSuggestionValue = (publication: Publication) => {
  const voteWeight = 0.4;
  const ageWeight = 0.6;
  const now = new Date();
  const age = now.getTime() - new Date(publication.created_at).getTime();
  const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos

  const voteScore = publication.votes_count;
  const ageScore = 1 - Math.min(age / maxAge, 1);


  return voteWeight * voteScore + ageWeight * ageScore;
};

export const sortPublicationsByVotes = (publications: Publication[]) => {
  return publications.sort((a, b) => b.votes_count - a.votes_count);
};

export const sortPublicationsByDate = (publications: Publication[]) => {
  return publications.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const sortPublicationsBySuggestion = (publications: Publication[]) => {
  return publications.sort(
    (a, b) => calculateSuggestionValue(b) - calculateSuggestionValue(a)
  );
};

export const filterPublicationsByCategory = (publications: Publication[], categoryId: any) => {
  return publications.filter((publication) => publication.publication_type_id === categoryId);
};
