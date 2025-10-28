export async function handler(event, context) {
  const API_KEY = process.env.WeatherAPI; // from Netlify environment variable
  const location = "35.592411,-97.4398651"; // Dhaba OKC coordinates

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Weather API error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // allow CORS
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
}
