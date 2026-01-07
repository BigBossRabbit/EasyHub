import { useState, useEffect } from 'react';

interface BossCountdownProps {
  targetDate?: Date;
  label?: string;
  expiredMessage?: string;
}

const BossCountdown = ({ targetDate = new Date('2025-12-31T23:59:59Z'), label = "BOSS CHALLENGE '25", expiredMessage = "Challenge Over" }: BossCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState('Loading...');
  const [timeColor, setTimeColor] = useState('text-green-500');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft(expiredMessage);
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

      if (days < 7) {
        setTimeColor('text-red-500');
      } else if (days < 30) {
        setTimeColor('text-orange-500');
      } else {
        setTimeColor('text-green-500');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pulseColorClass = timeColor.replace('text-', 'bg-');

  return (
    <div>
      <span className="text-xs text-muted-foreground font-mono uppercase">{label}</span>
      <div className={`flex items-center gap-1 text-xs ${timeColor} font-mono`}>
        <div className={`w-2 h-2 ${pulseColorClass} rounded-full animate-pulse`}></div>
        <span>{timeLeft}</span>
      </div>
    </div>
  );
};

export default BossCountdown;
