export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  productCategory?: string;
}

export async function sendEnquiry(payload: EnquiryPayload): Promise<{ success: boolean }> {
  try {
    console.log('Sending enquiry with payload:', payload);
    
    const res = await fetch('https://finalised-a77d.onrender.com/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    console.log('Response status:', res.status);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const json = await res.json();
    console.log('Response JSON:', json);
    
    return { success: json.success };
  } catch (error) {
    console.error('Error sending enquiry:', error);
    throw error;
  }
} 