export const convertTimeInDay = (time, timeZone) => {
	return new Date(time).toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: timeZone });
}