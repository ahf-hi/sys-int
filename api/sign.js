import crypto from 'crypto';

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { dataToSign } = req.body;
        // Accessing the key from Vercel Environment Variables
        const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

        const signer = crypto.createSign('SHA256');
        signer.update(dataToSign);
        
        // Generate signature in Base64
        const signature = signer.sign(privateKey, 'base64');

        // Convert Base64 to Base64Url
        const base64Url = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

        res.status(200).json({ mpi_mac: base64Url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
