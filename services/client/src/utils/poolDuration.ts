export const getPoolDuration = (endDate: number): string => {
  const now = Date.now();
  const timeLeft = Math.max(0, Math.ceil((endDate * 1000 - now) / 1000)); // Time left in seconds

  if (timeLeft <= 0) {
    return '0 time left';
  } else {
    let daysLeft = Math.floor(timeLeft / (24 * 60 * 60));
    let hoursLeft = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    let minutesLeft = Math.floor((timeLeft % (60 * 60)) / 60);

    if (daysLeft >= 1) {
      return `${daysLeft} days`;
    } else if (hoursLeft >= 1) {
      return `${hoursLeft} hours`;
    } else {
      return `${minutesLeft} minutes`;
    }
  }
};
