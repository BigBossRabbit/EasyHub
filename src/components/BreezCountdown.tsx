import { useState, useEffect } from 'react';

const BreezCountdown = () => {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const [timeColor, setTimeColor] = useState('text-green-500');

  useEffect(() => {
    const interval = setInterval(() => {
      // Get current time as a Date object representing the time in Tel Aviv
      const nowInTelAviv = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tel_Aviv' }));

      // Set target to midnight of the *next* day in Tel Aviv time
      const midnightTelAviv = new Date(nowInTelAviv);
      midnightTelAviv.setDate(midnightTelAviv.getDate() + 1);
      midnightTelAviv.setHours(0, 0, 0, 0);

      const diff = midnightTelAviv.getTime() - nowInTelAviv.getTime();

      if (diff <= 0) {
        setTimeLeft('No More Submissions');
        setTimeColor('text-red-500');
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`
      );

      if (hours < 6) {
        setTimeColor('text-red-500');
      } else if (hours < 24) {
        setTimeColor('text-orange-500');
      } else {
        setTimeColor('text-green-500');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pulseColorClass = timeColor.replace('text-', 'bg-');

  return (
    <div>
      <span className="text-xs text-muted-foreground font-mono">TIME2BUILD</span>
      <div className={`flex items-center gap-1 text-xs ${timeColor} font-mono`}>
        <div className={`w-2 h-2 ${pulseColorClass} rounded-full animate-pulse`}></div>
        <span>{timeLeft}</span>
      </div>
    </div>
  );
};

export default BreezCountdown;