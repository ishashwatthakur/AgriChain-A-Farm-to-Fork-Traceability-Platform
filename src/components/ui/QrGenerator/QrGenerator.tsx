import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '../card';
import { Button } from '../button';

interface QRGeneratorProps {
  batchId: string;
  productName: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ batchId, productName }) => {
  const qrValue = `${window.location.origin}/trace/${batchId}`;

  const downloadQRCode = () => {
    const canvas = document.createElement("canvas");
    const svg = document.querySelector('.qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg!);
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${productName}-${batchId}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Card className="p-6 flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold">Product QR Code</h3>
      <div className="bg-white p-4 rounded-lg">
        <QRCodeSVG
          value={qrValue}
          size={200}
          className="qr-code-svg"
          level="H" // High error correction
          includeMargin={true}
        />
      </div>
      <div className="text-sm text-center text-gray-500 mt-2">
        <p>Batch ID: {batchId}</p>
        <p>Product: {productName}</p>
      </div>
      <Button onClick={downloadQRCode} className="mt-2">
        Download QR Code
      </Button>
    </Card>
  );
};