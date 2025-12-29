export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const queryParams = new URLSearchParams(data).toString();

        // Check if redirect data exists to determine the final destination
        const destination = data.MPI_REDIRECT_HTTP_DATA ? 'form.html' : 'payment-status.html';
        const finalUrl = `/${destination}?${queryParams}`;

        // Send a temporary "Review" page instead of redirecting immediately
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Review Response Body</title>
                <style>
                    body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px; line-height: 1.5; }
                    .container { max-width: 800px; margin: 0 auto; background: #252526; padding: 20px; border-radius: 8px; border: 1px solid #333; }
                    h2 { color: #569cd6; border-bottom: 1px solid #333; padding-bottom: 10px; }
                    pre { background: #000; padding: 15px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; color: #9cdcfe; }
                    .btn { display: inline-block; background: #0e639c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px; font-family: sans-serif; }
                    .btn:hover { background: #1177bb; }
                    .label { color: #ce9178; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Step 1: Review Response Body</h2>
                    <p>The server received the following <b>POST</b> payload from the bank:</p>
                    <pre>${JSON.stringify(data, null, 4)}</pre>
                    
                    <p>Click below to proceed to the ${data.MPI_REDIRECT_HTTP_DATA ? 'Redirection Form' : 'Receipt Page'}:</p>
                    <a href="${finalUrl}" class="btn">Continue to Next Step →</a>
                </div>
            </body>
            </html>
        `);
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
