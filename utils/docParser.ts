export const extractTextFromDOCX = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error("DOCX Extraction Error:", error);
    throw new Error("Failed to parse DOCX. Please try again or copy-paste text.");
  }
};
