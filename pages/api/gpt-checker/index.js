import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req, res) => {

  try {
    console.log(req?.body?.text.length, 'characters running')

    const startTime = Date.now();

    var data = JSON.stringify({
      "input_sequence": `${req?.body?.text}`,
      "model": 139,
      "version": 390,
      "account": 13
    });

    const response = await fetch(
      "https://predict.pyqai.com/",
      {
        headers: {
          Authorization: `Bearer ${process.env.PYQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }
    );

    console.log(await response, data)

    const result = await response.json();
    const endTime = Date.now();
    console.log('time', endTime - startTime)
    

    return res?.status(200).json(result)

  } catch(error) {
    return res.status(200).json('ERROR')
  }

}

export default handler;