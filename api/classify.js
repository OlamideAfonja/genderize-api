import axios from "axios";

export default async function handler(req, res) {
  // CORS (REQUIRED)
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { name } = req.query;

    // 400: Missing name
    if (!name || name.trim() === "") {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name parameter"
      });
    }

    // 422: Not a string
    if (typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "name must be a string"
      });
    }

    // Call Genderize API
    const response = await axios.get(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`
    );

    const { gender, probability, count } = response.data;

    // Edge case
    if (!gender || count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name"
      });
    }

    const sample_size = count;

    const is_confident =
      probability >= 0.7 && sample_size >= 100;

    const processed_at = new Date().toISOString();

    return res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at
      }
    });

  } catch (error) {
    return res.status(502).json({
      status: "error",
      message: "Failed to fetch data from Genderize API"
    });
  }
}