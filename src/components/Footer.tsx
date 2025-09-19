import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t py-4 px-6 bg-background">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/help" className="hover:text-foreground transition-colors">
            Help Center
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            Version 1.0.0
          </p>
          <Separator orientation="vertical" className="h-4" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Store Management
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;