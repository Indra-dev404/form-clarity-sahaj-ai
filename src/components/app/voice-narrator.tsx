'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, StopCircle } from 'lucide-react';

interface VoiceNarratorProps {
  textToSpeak: string;
}

export function VoiceNarrator({ textToSpeak }: VoiceNarratorProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkSupport = 'speechSynthesis' in window;
    setIsSupported(checkSupport);

    // Cleanup: cancel speech synthesis on component unmount or when text changes
    return () => {
      if (checkSupport) {
        window.speechSynthesis.cancel();
      }
    };
  }, [textToSpeak]);

  const handlePlay = () => {
    if (!isSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => {
        setIsActive(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        // Handle potential errors
        setIsActive(false);
        setIsPaused(false);
      };
      window.speechSynthesis.cancel(); // ensure nothing else is speaking
      window.speechSynthesis.speak(utterance);
    }
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsActive(false);
    setIsPaused(false);
  };
  
  if (!isSupported) {
    return <p className="text-sm text-muted-foreground">Voice narration not supported.</p>;
  }

  return (
    <div className="flex items-center gap-2">
      {!isActive ? (
        <Button onClick={handlePlay} variant="outline">
          <Play className="mr-2 h-4 w-4" />
          Listen
        </Button>
      ) : (
        <Button onClick={isPaused ? handlePlay : handlePause} variant="outline">
          {isPaused ? <Play className="mr-2 h-4 w-4" /> : <Pause className="mr-2 h-4 w-4" />}
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
      )}
      <Button onClick={handleStop} variant="ghost" size="icon" disabled={!isActive && !isPaused}>
        <StopCircle className='h-5 w-5'/>
        <span className="sr-only">Stop</span>
      </Button>
    </div>
  );
}
