exports.handler = async function(event) {
  console.log('Event received:', JSON.stringify(event));
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'Hello from Scalix Function!', event })
  };
};
