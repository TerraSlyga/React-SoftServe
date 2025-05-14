export function transformSessions(sessions) {
  const grouped = {};

  sessions.forEach((session) => {
    const date = formatDate(session.showDate);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({
      time: session.showTime.slice(0, 5),
      price: `${session.price} грн`,
    });
  });

  return Object.entries(grouped).map(([date, times]) => ({
    date,
    times,
  }));
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}`;
}
