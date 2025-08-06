
// This assumes jspdf and html2canvas are loaded from a CDN in index.html
declare const jspdf: any;
declare const html2canvas: any;

export const generatePdf = async (element: HTMLElement, fileName: string): Promise<void> => {
    if (!element) {
        console.error("Element to capture is not provided.");
        return;
    }
    
    // Temporarily remove rotation from vertical text elements for better PDF rendering
    const verticalTextElements = Array.from(element.querySelectorAll<HTMLElement>('.pdf-vertical-text'));
    verticalTextElements.forEach(el => {
        el.classList.remove('transform', '-rotate-180');
    });

    try {
        const { jsPDF } = jspdf;
        const canvas = await html2canvas(element, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;
        
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(fileName);

    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("خطا در ایجاد فایل PDF. لطفاً دوباره تلاش کنید.");
    } finally {
        // Revert styles so the on-screen display remains correct
        verticalTextElements.forEach(el => {
            el.classList.add('transform', '-rotate-180');
        });
    }
};
