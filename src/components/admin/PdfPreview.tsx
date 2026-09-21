import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfPreview({ pdfDataUri, width }: { pdfDataUri: string, width: number }) {
  return (
    <Document file={pdfDataUri}>
      <Page 
        pageNumber={1} 
        renderTextLayer={false} 
        renderAnnotationLayer={false} 
        width={width}
      />
    </Document>
  );
}
