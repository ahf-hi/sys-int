export default function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const queryParams = new URLSearchParams(data).toString();

        // Check if the specific "Redirect Data" field exists in the bank's response
        if (data.MPI_REDIRECT_HTTP_DATA) {
            // Send to the Form page
            res.redirect(302, `/form.html?${queryParams}`);
        } else {
            // Send to the standard Receipt page
            res.redirect(302, `/payment-status.html?${queryParams}`);
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
