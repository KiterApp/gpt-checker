import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    console.log(req?.body?.text, 'runing')

    var data = JSON.stringify({
      "inputs": `${req?.body?.text}`,
    });

    const response = await fetch(
      "https://api-inference.huggingface.co/models/roberta-base-openai-detector",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log(result, 'result')
    

    return res?.status(200).json(result)

  } catch(error) {
    return res.status(200).json('ERROR')
  }

}

export default handler;