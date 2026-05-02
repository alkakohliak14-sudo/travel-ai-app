export default async function handler(req, res) {

  const { destination, days, people, type } = req.body;

  const prompt = `
Create a ${days}-day travel itinerary for a ${type} trip to ${destination} for ${people} people.

Include:
- Day-wise plan
- Morning, afternoon, evening
- Practical and realistic schedule
- Budget-friendly Indian suggestions

Keep it clean and easy to follow.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    result: data.choices[0].message.content
  });
}