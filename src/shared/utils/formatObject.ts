/* eslint-disable @typescript-eslint/no-explicit-any */

export const returnObject = (obj: any) => {
  const newObj: any = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string' && value.length > 0) {
      newObj[key] = value;
    } else if (typeof value === 'number' && value !== 0) {
      newObj[key] = value;
    }
  }

  return newObj;
};
