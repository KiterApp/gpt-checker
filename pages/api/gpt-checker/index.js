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

    const result = await response.json();
    const endTime = Date.now();
    console.log(response.status, result, 'time', endTime - startTime)
    
    if (response.status === 200) {
      return res?.status(200).json(result)
    } else {
      return res?.status(200).json('ERROR')
    }

  } catch(error) {
    return res.status(200).json('ERROR')
  }

}

export default handler;