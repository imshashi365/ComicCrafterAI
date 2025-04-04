import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Replace with your Stability AI key in .env or hardcoded (for now using hardcoded)
const STABILITY_API_KEY = process.env.STABILITY_API_KEY || 'sk-aC0d82yOyuwtiXzPxutQxAeZJKOhw4IjjRVcz8HocWt5jmRf';

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
      }
    );

    const imageBase64 = response.data.artifacts[0].base64;
    res.status(200).json({ photo: imageBase64 });

  } catch (error) {
    console.error('Stability AI Error:', error?.response?.data || error.message);
    res.status(500).json({
      error: error?.response?.data?.message || 'Something went wrong with Stability AI',
    });
  }
});

export default router;
