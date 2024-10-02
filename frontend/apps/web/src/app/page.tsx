'use client';

import { Button } from '@ui/components/button';
import { Calendar } from '@ui/components/calendar';
import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Button>teste</Button>
    </div>
  );
}
