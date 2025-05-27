export default {
  async fetch(request) {
    const url = new URL(request.url);
    const message = url.searchParams.get("q");

    if (!message) {
      return new Response(JSON.stringify({
        error: "Missing query parameter 'q'",
        status: 400,
        successful: "failed"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload = {
      prompt: message,
      model: "claude-3-opus"  // You can change this if needed
    };

    try {
      const response = await fetch("https://claude3.gptnb.xyz/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": getUserAgent()
        },
        body: JSON.stringify(payload),
      });

      const resultText = await response.text();

      return new Response(JSON.stringify({
        Join: "https://t.me/Ashlynn_Repository",
        response: resultText,
        status: 200,
        successful: "success"
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

    } catch (error) {
      return new Response(JSON.stringify({
        Join: "https://t.me/Ashlynn_Repository",
        response: error.message,
        status: 500,
        successful: "failed"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

function getUserAgent() {
  const agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/537.36",
  ];
  return agents[Math.floor(Math.random() * agents.length)];
}
