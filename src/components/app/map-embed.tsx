'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface MapEmbedProps {
  searchQuery: string;
}

export function MapEmbed({ searchQuery }: MapEmbedProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Google Maps Not Configured</AlertTitle>
        <AlertDescription>
          To see nearby service centers, you need to add a Google Maps API key. Please add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to your `.env` file.
        </AlertDescription>
      </Alert>
    );
  }

  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(searchQuery)}`;

  return (
    <div className="aspect-video w-full">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
      ></iframe>
    </div>
  );
}
