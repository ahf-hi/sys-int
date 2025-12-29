export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const queryParams = new URLSearchParams(data).toString();

        // Check if the specific redirect field exists
        if (data.MPI_REDIRECT_HTTP_DATA) {
            // STEP A: Show the Review Page first
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Review Redirection Data</title>
                    <style>
                        body { font-family: monospace; background: #121212; color: #00ff00; padding: 20px; }
                        .box { border: 1px solid #333; padding: 20px; background: #000; border-radius: 5px; }
                        pre { white-space: pre-wrap; word-break: break-all; color: #00ff00; }
                        .btn { display: inline-block; background: #28a745; color: white; padding: 15px 30px; 
                               text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; font-family: sans-serif; }
                    </style>
                </head>
                <body>
                    <div class="box">
                        <h2>Response Body Detected</h2>
                        <p>The bank has sent redirection data. Please review below:</p>
                        <hr>
                        <pre>${JSON.stringify(data, null, 4)}</pre>
                        
                        <a href="/form.html?${queryParams}" class="btn">Continue to Form</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            // STEP B: No redirect data found, go straight to receipt
            res.redirect(302, `/payment-status.html?${queryParams}`);
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
