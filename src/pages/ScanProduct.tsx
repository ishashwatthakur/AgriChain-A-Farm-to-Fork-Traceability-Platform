import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeScanner } from '@/components/ui/QrScanner/QrScanner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

export const ScanProduct: React.FC = () => {
  const [batchId, setBatchId] = useState('');
  const navigate = useNavigate();

  const handleScan = (result: string) => {
    // Assuming the QR code contains a batch ID
    if (result) {
      navigate(`/trace/${result}`);
    }
  };

  const handleError = (error: Error) => {
    toast({
      variant: "destructive",
      title: "Error scanning QR code",
      description: error.message
    });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (batchId.trim()) {
      navigate(`/trace/${batchId}`);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid Batch ID"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Track Your Food's Journey</h1>
      
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
          <QRCodeScanner onScan={handleScan} onError={handleError} />
        </Card>

        <div className="text-center text-gray-500">- OR -</div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Enter Batch ID Manually</h2>
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Batch ID"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Track Product
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};