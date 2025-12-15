import { useState, useEffect } from 'react';

const BreezCountdown = () => {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const [timeColor, setTimeColor] = useState('text-green-500');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      // Deadline: Dec 16, 2025 end of day in Tel Aviv (UTC+2)
      // which is 2025-12-16 22:00:00 UTC
      const deadline = new Date('2025-12-16T22:00:00Z');

      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('No More Submissions');
        setTimeColor('text-red-500');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(days)}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0'
        )}:${String(seconds).padStart(2, '0')}`
      );

      if (days === 0 && hours < 6) {
        setTimeColor('text-red-500');
      } else if (days < 1) {
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
