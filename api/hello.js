// CORS middleware function
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
  
    // Handle preflight request
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // Pass request to the actual handler
    return await fn(req, res);
  };
  
  // Your actual serverless function
  const handler = async (req, res) => {
    const d = new Date();
    res.json({ message: d.toString() }); // Respond with JSON data
  };
  
  // Export the wrapped handler function
  module.exports = allowCors(handler);
  