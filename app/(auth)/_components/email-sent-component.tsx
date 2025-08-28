"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";

interface iAppProps {
  onChange: (value: boolean) => void;
  email?: string;
}

export function IsEmailSentComponent({ onChange }: iAppProps) {
  return (
    <div className="flex items-center justify-center min-h-full px-4">
      <Card className="w-full max-w-md text-center shadow-lg rounded-2xl p-6">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Check your inbox
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            We’ve sent a confirm email link to your email. Click the link inside
            your email to log in securely.
          </p>

          <div className="space-y-3">
            <Button
              variant="default"
              className="w-full"
              onClick={() => onChange?.(false)}
            >
              <Mail className="h-4 w-4 mr-2" />
              Try another email
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
