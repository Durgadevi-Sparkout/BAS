"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Log in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <h1 className="text-2xl font-bold mb-1">Get started</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales.
              </p>
              <form className="space-y-4">
                <Input 
                  placeholder="Email" 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)} 
                  type="email" 
                  required 
                />
                <Input 
                  placeholder="Password" 
                  value={loginPassword} 
                  onChange={(e) => setLoginPassword(e.target.value)} 
                  type="password" 
                  required 
                />
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-primary" />
                    Keep me signed in
                  </label>
                  <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full">Log in</Button>
              </form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FaGoogle className="h-5 w-5" /> Sign in with Google
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FaApple className="h-5 w-5" /> Sign in with Apple
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <h1 className="text-2xl font-bold mb-1">Get started</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales.
              </p>
              <form className="space-y-4">
                <Input 
                  placeholder="Your name" 
                  value={signupName} 
                  onChange={(e) => setSignupName(e.target.value)} 
                  type="text" 
                  required 
                />
                <Input 
                  placeholder="Email" 
                  value={signupEmail} 
                  onChange={(e) => setSignupEmail(e.target.value)} 
                  type="email" 
                  required 
                />
                <Input 
                  placeholder="Password" 
                  value={signupPassword} 
                  onChange={(e) => setSignupPassword(e.target.value)} 
                  type="password" 
                  required 
                />
                <Button type="submit" className="w-full">Create account</Button>
              </form>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FaGoogle className="h-5 w-5" /> Sign in with Google
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FaApple className="h-5 w-5" /> Sign in with Apple
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
