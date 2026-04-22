export default async function handler(req, res) {
  // Only allow POST requests to your own API
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const KEY_EXCHANGE_URL = "https://devlink.paydee.co/mpi/mkReq";

    // Forward the request to Paydee from the server
    const response = await fetch(KEY_EXCHANGE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You can add other headers here if Paydee requires them (like User-Agent)
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    // Return Paydee's response back to your frontend
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
