export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const queryParams = new URLSearchParams(data).toString();

        // 1. Determine the destination based on your specific logic
        let destination = "";

        if (data.MPI_REDIRECT_URL && data.MPI_REDIRECT_HTTP_DATA) {
            // Case A: Both URL and DATA exist
            destination = "/pag/iframe/redirect-01.html";
        } else if (data.MPI_REDIRECT_URL) {
            // Case B: Only URL exists
            destination = "/pag/iframe/redirect-02.html";
        }

        // 2. If a destination was found, show the Review Page. If not, go to receipt.
        if (destination !== "") {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Transaction Review</title>
                    <style>
                        body { font-family: -apple-system, system-ui, sans-serif; background-color: #ffffff; color: #000000; padding: 20px; line-height: 1.5; }
                        .wrapper { max-width: 900px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; border-radius: 4px; }
                        h1 { font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                        pre { background-color: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; overflow-x: auto; white-space: pre-wrap; word-break: break-all; font-size: 14px; color: #333; }
                        .button { display: inline-block; background-color: #000000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: 600; margin-top: 20px; }
                        .button:hover { background-color: #333333; }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <h1>Response Body</h1>
                        <pre>${JSON.stringify(data, null, 4)}</pre>
                        <p><strong>Target Page:</strong> ${destination}</p>
                        <a href="${destination}?${queryParams}" class="button">Continue to Form</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            // Case C: Neither condition met, send straight to receipt
            res.redirect(302, `/payment-status.html?${queryParams}`);
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
