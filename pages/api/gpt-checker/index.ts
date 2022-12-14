import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    console.log(req?.body?.text, 'running')

    var data = JSON.stringify({
      "input_sequence": `${req?.body?.text}`,
      "model": 139,
      "version": 388,
      "account": 13
    });

    const response = await fetch(
      "https://predict.pyqai.com/",
      {
        headers: { Authorization: `Bearer ${process.env.PYQ_API_KEY}` },
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