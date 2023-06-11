export default function formatTimeStamp(timestamp) {
    const date = new Date(timestamp);

    // Get the individual components of the date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear() % 100; // Get the last two digits of the year

    // Pad single-digit values with a leading zero
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedYear = year.toString().padStart(2, '0');

    // Assemble the final formatted string
    const formattedString = `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${formattedYear}`;

    return formattedString;
}