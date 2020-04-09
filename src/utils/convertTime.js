export const convertTimeInDay = (time) => {
	return new Date(time).toLocaleString('en-US', { month: 'short', day: 'numeric' });
}