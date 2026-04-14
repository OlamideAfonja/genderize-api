# Genderize API Wrapper

## Endpoint
GET /api/classify?name={name}

## Example
https://your-app.vercel.app/api/classify?name=john

## Response
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}

## Tech Stack
- Node.js
- Vercel Serverless Functions