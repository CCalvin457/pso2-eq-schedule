export function compareDates(a, b, ascending = true) {
    return ascending ? a.startTime - b.startTime : b.startTime - a.startTime;
}