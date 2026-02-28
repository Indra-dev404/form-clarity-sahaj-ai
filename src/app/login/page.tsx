'use client';

import { useState } from 'react';
import { useAuth } from '@/components/app/auth-context';
import { loginAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, Bot } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginAction(password);
      login(response.token);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-cover bg-center" style={{ backgroundImage: "url('/bg_home.png')" }}>
      <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl border-white/30 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bot className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-headline font-bold">Sahaj AI</CardTitle>
            <CardDescription>Secure access to your document simplifier</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Access Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password (hint: admin123)"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-xs text-muted-foreground w-full">
            Protected by Sahaj AI Security
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
