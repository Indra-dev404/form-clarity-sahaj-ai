'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Language = 'English' | 'Hindi' | 'Bengali' | 'Marathi' | 'Gujarati' | 'Tamil';
const languages: Language[] = ['English', 'Hindi', 'Bengali', 'Marathi', 'Gujarati', 'Tamil'];
const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
const maxSize = 10 * 1024 * 1024; // 10MB

interface FileUploaderProps {
  onFileProcess: (file: File, language: Language) => void;
  disabled: boolean;
}

export function FileUploader({ onFileProcess, disabled }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<Language>('English');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateAndSetFile = (selectedFile: File) => {
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({ variant: 'destructive', title: 'Invalid file type', description: 'Please upload a PDF, JPG, or PNG file.' });
      return;
    }
    if (selectedFile.size > maxSize) {
      toast({ variant: 'destructive', title: 'File too large', description: 'File size cannot exceed 10MB.' });
      return;
    }
    setFile(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    else if (e.type === 'dragleave') setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const onZoneClick = () => inputRef.current?.click();

  const handleProcess = () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please select a file to process.' });
      return;
    }
    setIsProcessing(true);
    onFileProcess(file, language);
  };

  return (
    <Card className="w-full max-w-lg mx-auto text-center print:hidden animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Understand Your Document</CardTitle>
        <CardDescription>Upload a government form to get a simple explanation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          onClick={onZoneClick}
          className={`p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-accent/20' : 'border-border hover:border-primary'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={allowedTypes.join(',')}
          />
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground pointer-events-none">
            <UploadCloud className="h-12 w-12" />
            <p className="text-lg font-medium">{isDragActive ? 'Drop the file here...' : 'Drag & drop a file, or click to select'}</p>
            <p className="text-sm">PDF, JPG, PNG up to 10MB</p>
          </div>
        </div>
        {file && (
          <div className="flex items-center justify-between p-3 bg-secondary rounded-md text-secondary-foreground">
            <div className="flex items-center gap-2 overflow-hidden">
                <FileIcon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{file.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
          </div>
        )}
        <div className="space-y-2 text-left">
          <Label htmlFor="language-select">Language for Explanation</Label>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)} disabled={disabled || isProcessing}>
            <SelectTrigger id="language-select">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleProcess} disabled={!file || disabled || isProcessing} size="lg" className="w-full">
          {(isProcessing || disabled) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isProcessing || disabled ? 'Processing...' : 'Explain Document'}
        </Button>
      </CardContent>
    </Card>
  );
}
