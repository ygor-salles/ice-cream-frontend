export const getShortName = (name: string) => {
  if (name) {
    const arrayNomes = name?.split(' ');
    const firstName = arrayNomes[0];
    const lastName = arrayNomes[arrayNomes.length - 1];
    return `${firstName} ${lastName}`;
  }
  return '';
};
