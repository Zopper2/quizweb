export async function POST(req) {
  // You could implement token blacklist here if needed
  return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
