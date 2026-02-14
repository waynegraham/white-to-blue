export const buildYoutubeUrl = (youtube) => {
  if (!youtube) {
    return "";
  }

  const [id, query] = youtube.split("?");
  if (query) {
    return `https://www.youtube.com/watch?v=${id}&${query}`;
  }
  return `https://www.youtube.com/watch?v=${id}`;
};

export const flattenMoveSections = (sections) =>
  (sections || []).flatMap((section) =>
    (section.moves || []).map((move) => ({
      ...move,
      sectionLabel: section.label,
    }))
  );
