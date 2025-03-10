export const getFilenameFromPath = (path: string) => {
  const splits = path.split('/');
  return splits[splits.length - 1];
};
