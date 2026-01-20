'use client';

import { useState } from 'react';
import { FileUploader } from './file-uploader';
import { ExplanationView } from './explanation-view';
import { getExplanationAction, translateExplanationAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { ExplainGovernmentFormOutput } from '@/ai/flows/explain-government-form';
import type { TranslateFormExplanationInput, TranslateFormExplanationOutput } from '@/ai/flows/translate-form-explanation';

type Language = 'English' | 'Hindi' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Tamil';

export function SahajApp() {
  const [explanationResult, setExplanationResult] = useState<ExplainGovernmentFormOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileProcess = async (file: File, language: Language) => {
    setIsLoading(true);
    setError(null);
    setExplanationResult(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const result = await getExplanationAction({ documentDataUri: dataUri, language });
        if (result.explanation) {
          setExplanationResult(result);
        } else {
          throw new Error('Failed to get an explanation from the AI.');
        }
      } catch (e: any) {
        const errorMessage = e.message || 'An unexpected error occurred.';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      const errorMessage = 'Failed to read the file.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
      setIsLoading(false);
    };
  };

  const handleTranslate = async (language: Language) => {
    if (!explanationResult?.explanation) return;

    setIsTranslating(true);
    try {
      const input: TranslateFormExplanationInput = {
        explanation: explanationResult.explanation,
        language: language,
      };
      const result: TranslateFormExplanationOutput = await translateExplanationAction(input);
      if (result.translatedExplanation) {
        setExplanationResult({ explanation: result.translatedExplanation });
        toast({
          title: "Success",
          description: `Explanation translated to ${language}.`,
        })
      } else {
        throw new Error('Failed to translate the explanation.');
      }
    } catch (e: any) {
        const errorMessage = e.message || 'An unexpected error occurred during translation.';
        toast({
          variant: "destructive",
          title: "Translation Error",
          description: errorMessage,
        })
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!explanationResult && !isLoading && (
        <FileUploader onFileProcess={handleFileProcess} disabled={isLoading} />
      )}
      {isLoading && <LoadingState />}
      {explanationResult && !isLoading && (
        <ExplanationView
          explanation={explanationResult.explanation}
          fileName={fileName}
          onNewUpload={() => {
            setExplanationResult(null);
            setFileName('');
          }}
          onTranslate={handleTranslate}
          isTranslating={isTranslating}
        />
      )}
    </div>
  );
}

function LoadingState() {
    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <Skeleton className="h-8 w-3/5 mx-auto" />
                <Skeleton className="h-4 w-4/5 mx-auto mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                 <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
                 <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </CardContent>
        </Card>
    )
}
