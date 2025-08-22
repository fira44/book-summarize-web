import { NextRequest, NextResponse } from "next/server";
import PdfParse from "pdf-parse";

// Disable built-in body parser (not needed for NextRequest.arrayBuffer())
export const config = {
  api: { bodyParser: false },
};

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    // Read raw PDF data
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF
    const pdfData = await PdfParse(buffer);

    return NextResponse.json({ text: pdfData.text });
  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
