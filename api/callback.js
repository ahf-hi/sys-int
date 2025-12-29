export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const queryParams = new URLSearchParams(data).toString();

        if (data.MPI_REDIRECT_HTTP_DATA) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Transaction Review</title>
                    <style>
                        body { 
                            font-family: -apple-system, system-ui, sans-serif; 
                            background-color: #ffffff; 
                            color: #000000; 
                            padding: 20px; 
                            line-height: 1.5;
                        }
                        .wrapper { 
                            max-width: 900px; 
                            margin: 0 auto; 
                            border: 1px solid #ddd; 
                            padding: 30px; 
                            border-radius: 4px;
                        }
                        h1 { font-size: 24px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
                        pre { 
                            background-color: #f8f9fa; 
                            padding: 20px; 
                            border: 1px solid #e9ecef; 
                            overflow-x: auto; 
                            white-space: pre-wrap; 
                            word-break: break-all;
                            font-size: 14px;
                            color: #333;
                        }
                        .button { 
                            display: inline-block; 
                            background-color: #000000; 
                            color: #ffffff; 
                            padding: 12px 24px; 
                            text-decoration: none; 
                            border-radius: 4px; 
                            font-weight: 600; 
                            margin-top: 20px;
                        }
                        .button:hover { background-color: #333333; }
                    </style>
                </head>
                <body>
                    <div class="wrapper">
                        <h1>Response Body</h1>
                        <pre>${JSON.stringify(data, null, 4)}</pre>
                        
                        <a href="/pag/iframe/redirect - PAG - NHPP.html?${queryParams}" class="button">Continue to Form</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            // No redirect data? Send straight to the standard receipt
            res.redirect(302, `/payment-status.html?${queryParams}`);
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}


