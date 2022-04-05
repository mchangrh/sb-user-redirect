const redirectResponse = (username) => new Response(null,  { status: 301, headers: { 'Location': `https://sb.ltn.fi/username/${username}/` }})

// Process all requests to the worker
const handleRequest = async (request) => {
  const { pathname } = new URL(request.url)
  // static endpoints
  const username = pathname.substring(1)
  // lookup in vanity url
  const vanity = await VANITY_URL.get(username)
  return vanity
    ? redirectResponse(vanity)
    : redirectResponse(username)
}

// Register the worker listener
addEventListener('fetch', event => {
  try {
    return event.respondWith(handleRequest(event.request))
  } catch (err) {
    console.log(err)
    throw err
  }
})