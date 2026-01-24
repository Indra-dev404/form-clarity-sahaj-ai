'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VoiceNarrator } from './voice-narrator';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Languages, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';

type Language = 'English' | 'Hindi' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Tamil';
const languages: Language[] = ['English', 'Hindi', 'Bengali', 'Marathi', 'Gujarati', 'Tamil'];

interface ExplanationViewProps {
  explanation: string;
  checklist: string[];
  fileName: string;
  language: Language;
  onNewUpload: () => void;
  onTranslate: (language: Language) => void;
  isTranslating: boolean;
}

export function ExplanationView({ explanation, checklist, fileName, language, onNewUpload, onTranslate, isTranslating }: ExplanationViewProps) {
  const [targetLanguage, setTargetLanguage] = useState<Language>('English');

  return (
    <div className="w-full space-y-6 animate-in fade-in-50 duration-500 print:space-y-0">
      <div className="flex justify-start print:hidden">
        <Button variant="outline" onClick={onNewUpload}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Upload Another Document
        </Button>
      </div>
      <Card className="print:shadow-none print:border-none print:bg-transparent">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Explanation for <span className="text-primary">{fileName}</span></CardTitle>
          <CardDescription>Here is a simplified explanation of your document.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Separator />
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap mt-4">
              {explanation}
            </p>
          </div>
          <div>
            <Separator/>
            <div className="mt-6">
              <h3 className="font-headline text-2xl">Submission Checklist</h3>
              <p className="text-muted-foreground mb-4">Follow these steps to ensure your form is submitted correctly.</p>
              <div className="space-y-4">
                  {checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Checkbox id={`checklist-${index}`} className="mt-1" />
                      <label
                        htmlFor={`checklist-${index}`}
                        className="text-sm font-normal text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-4 justify-between items-center print:hidden">
            <VoiceNarrator textToSpeak={explanation} language={language} />
            <div className="flex gap-2 w-full sm:w-auto">
                <Select value={targetLanguage} onValueChange={(v) => setTargetLanguage(v as Language)} disabled={isTranslating}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Translate to..." />
                    </SelectTrigger>
                    <SelectContent>
                        {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button onClick={() => onTranslate(targetLanguage)} disabled={isTranslating} className="w-full sm:w-auto">
                    {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Languages className="mr-2 h-4 w-4" />}
                    Translate
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
