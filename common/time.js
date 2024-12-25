const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC', 
})

function formatTimeUTC(timestamp){
    const date = new Date(timestamp * 1000); 
    const formatted = timeFormatter.format(date);
    return formatted
}