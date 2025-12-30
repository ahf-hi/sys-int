export default function handler(req, res) {
    if (req.method === 'POST') {
        // Vercel parses req.body automatically
        const data = req.body;
        
        // Convert the body object into a query string
        const queryParams = new URLSearchParams(data).toString();

        // Check if we have the minimum required URL to proceed
        if (data.MPI_REDIRECT_URL) {
            const destination = "/pag/iframe/redirect.html";

            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(`
                <div class="wrapper" style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px;">
                    <h1>Processing Request...</h1>
                    <pre style="background: #f4f4f4; padding: 15px;">Data received, preparing redirect.</pre>
                    <a href="${destination}?${queryParams}" 
                       style="background: black; color: white; padding: 10px; text-decoration: none; border-radius: 4px;">
                       Continue to Provider
                    </a>
                </div>
            `);
        } else {
            // If no URL is provided, fall back to status page
            res.redirect(302, `/payment-status.html?${queryParams}`);
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
