export default function handler(req, res) {
    // Check if the request is a POST (standard for payment gateways)
    if (req.method === 'POST') {
        // req.body contains the FORM data sent by the provider
        const data = req.body;

        // Convert the object into a URL-friendly string (e.g., ?MPI_STATUS=1&...)
        const queryParams = new URLSearchParams(data).toString();

        // Redirect the user back to your landing page with the data attached
        // Using a relative path works perfectly on Vercel
        res.redirect(302, `/payment-status.html?${queryParams}`);
    } else {
        // If someone tries to visit the API link directly, show an error
        res.status(405).json({ error: "Method Not Allowed. This endpoint expects a POST request from the payment gateway." });
    }
}