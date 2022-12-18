import { format, parse } from 'date-fns';

export function formatSplynxDate(dateString: string, formatString: string) {
  return format(parse(dateString, 'yyyy-MM-dd', new Date()), formatString);
}
