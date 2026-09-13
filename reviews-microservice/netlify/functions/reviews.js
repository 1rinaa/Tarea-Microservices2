const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data, statusCode = 200) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    body: data === undefined ? '' : JSON.stringify(data),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }

  try {
    // GET /api/reviews            → todas las reseñas
    // GET /api/reviews?bookId=1   → reseñas de un libro
    if (event.httpMethod === 'GET') {
      const bookId = event.queryStringParameters?.bookId;
      let rows;
      if (bookId) {
        rows = await sql`SELECT * FROM reviews WHERE book_id = ${bookId} ORDER BY created_at DESC`;
      } else {
        rows = await sql`SELECT * FROM reviews ORDER BY created_at DESC`;
      }
      return json(rows);
    }

    // POST /api/reviews  body: { bookId, user, rating, text }
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { bookId, user, rating, text } = body;

      if (!bookId || !user || !rating) {
        return json({ error: 'Faltan campos: bookId, user, rating' }, 400);
      }

      const rows = await sql`
        INSERT INTO reviews (book_id, user_name, rating, text)
        VALUES (${bookId}, ${user}, ${rating}, ${text || ''})
        RETURNING *
      `;
      return json(rows[0], 201);
    }

    return json({ error: 'Method not allowed' }, 405);
  } catch (err) {
    return json({ error: 'Server error: ' + err.message }, 500);
  }
};