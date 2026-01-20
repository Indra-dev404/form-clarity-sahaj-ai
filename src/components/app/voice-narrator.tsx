'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, StopCircle, Loader2 } from 'lucide-react';
import { textToSpeechAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type Language = 'English' | 'Hindi' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Tamil';

interface VoiceNarratorProps {
  textToSpeak: string;
  language: Language;
}

export function VoiceNarrator({ textToSpeak, language }: VoiceNarratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Reset audio when text or language changes
  useEffect(() => {
    setAudioDataUri(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
  }, [textToSpeak, language]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      return;
    }

    if (audioDataUri && audioRef.current) {
      audioRef.current.play();
      return;
    }

    setIsLoading(true);
    try {
      const result = await textToSpeechAction({ text: textToSpeak, language });
      if (result.audioDataUri) {
        setAudioDataUri(result.audioDataUri);
      } else {
        throw new Error('Could not generate audio.');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Audio Generation Error',
        description: error.message || 'Failed to generate audio.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to play audio when data URI is set
  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
      audioRef.current.play();
    }
  }, [audioDataUri]);


  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <Button onClick={handlePlayPause} variant="outline" disabled={isLoading}>
        {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Generating...</>
        ) : isPlaying ? (
            <><Pause className="mr-2 h-4 w-4" /> Pause</>
        ) : (
            <><Play className="mr-2 h-4 w-4" /> {audioDataUri && !isPlaying ? 'Play' : 'Listen'}</>
        )}
      </Button>
      <Button onClick={handleStop} variant="ghost" size="icon" disabled={!audioDataUri}>
        <StopCircle className='h-5 w-5'/>
        <span className="sr-only">Stop</span>
      </Button>
      <audio 
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
