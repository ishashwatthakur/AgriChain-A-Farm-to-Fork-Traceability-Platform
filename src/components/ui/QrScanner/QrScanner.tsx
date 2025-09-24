import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Button } from '../button';
import { Card } from '../card';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: Error) => void;
}

export const QRCodeScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    // Check if camera is available
    QrScanner.hasCamera().then(setHasCamera);
    
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
          // Optional: Stop scanning after successful scan
          // stopScanning();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await scannerRef.current.start();
      setIsScanning(true);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      }
      console.error('Failed to start scanner:', error);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.destroy();
      scannerRef.current = null;
      setIsScanning(false);
    }
  };

  if (!hasCamera) {
    return (
      <Card className="p-4">
        <p className="text-red-500">No camera found. Please make sure your device has a camera and you've granted permission to use it.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" />
        </div>
        <div className="flex gap-2">
          {!isScanning ? (
            <Button onClick={startScanning} variant="default">
              Start Scanning
            </Button>
          ) : (
            <Button onClick={stopScanning} variant="destructive">
              Stop Scanning
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};