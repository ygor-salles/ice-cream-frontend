const ENVIROMENT =
  process.env.REACT_APP_ENVIROMENT === 'development'
    ? process.env.REACT_APP_DEV
    : process.env.REACT_APP_PROD;

export default function transformImageUrl(link: string): string {
  return link?.indexOf('http') !== -1 ? link : `${ENVIROMENT}/${link}`;
}
