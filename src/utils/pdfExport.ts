import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function downloadDirectPDF(
  elementId: string,
  candidateName: string,
  onProgress?: (status: boolean) => void
) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Element CV tidak ditemukan');
  }

  if (onProgress) onProgress(true);

  try {
    // Clone element or configure html2canvas for crisp 300 DPI rendering
    const canvas = await html2canvas(element, {
      scale: 2, // 2x scaling for ultra-sharp vector-like rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
      onclone: (clonedDoc) => {
        // Ensure no-print elements and edit hover badges are hidden in clone
        const noPrintElements = clonedDoc.querySelectorAll('.no-print');
        noPrintElements.forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
        const cvElem = clonedDoc.getElementById(elementId);
        if (cvElem) {
          cvElem.style.boxShadow = 'none';
          cvElem.style.border = 'none';
          cvElem.style.margin = '0 auto';
          cvElem.style.width = '800px';
          cvElem.style.maxWidth = '800px';
        }
      },
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Subsequent pages if CV exceeds 1 A4 page
    while (heightLeft > 5) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    const cleanName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
    pdf.save(`CV_${cleanName}.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  } finally {
    if (onProgress) onProgress(false);
  }
}
