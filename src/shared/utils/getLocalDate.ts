import moment from 'moment-timezone';

export const getLocalDate = (dateString?: string) => {
  let date: moment.Moment;

  if (dateString) {
    date = moment.utc(dateString);
    date.add(12, 'hour');
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  date = moment(new Date());
  const dateLocal = date.tz('America/Sao_Paulo');
  return dateLocal.format('YYYY-MM-DD HH:mm:ss.SSS');
};
