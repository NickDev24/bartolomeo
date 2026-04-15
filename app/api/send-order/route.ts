import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // WhatsApp number (Argentina format)
    const phoneNumber = "5493874625750";
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // For Vercel deployment, we'll return the URL so the frontend can open it
    // In a production environment with whatsapp-web.js, you would send the message here
    // Since whatsapp-web.js requires a Node.js server with persistent connection,
    // we'll use the wa.me link as a fallback that works on Vercel
    
    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: "Order processed successfully",
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
