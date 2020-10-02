import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function TimeSince(timestamp) {
  const startDate = new Date(timestamp * 1000);
  const endDate = new Date();
  const diff = endDate.getTime() - startDate.getTime() - 1000;
  return timeAgo.format(Date.now() - diff);
}
