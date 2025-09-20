'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I add a new product?',
      answer:
        'To add a new product, navigate to the Catalog section, click on Products, and then click the "Add Product" button. Fill in the required details and save.',
    },
    {
      question: 'How can I track my inventory?',
      answer:
        'The Inventory section provides a complete overview of your stock levels. You can view current stock, track movements, and set up low-stock alerts.',
    },
    {
      question: 'How do I process a sales order?',
      answer:
        'Go to the Sales Orders section, create a new order, add products, and specify customer details. Once the order is confirmed, you can manage its fulfillment status.',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                If you can't find an answer in the FAQ, please fill out the form
                below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  className="min-h-[150px]"
                />
              </div>
              <Button>Submit</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}