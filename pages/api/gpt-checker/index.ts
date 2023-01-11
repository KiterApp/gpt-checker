import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

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

    // logSupabase(req?.body?.text, req?.body?.user_validation, result)
    const endTime = Date.now();
    


    


    
    if (response.status === 200) {
      console.log('API time', endTime - startTime, result)
      return res?.status(200).json(result)
    } else {
      return res?.status(200).json('ERROR')
    }

  } catch(error) {
    return res.status(200).json('ERROR')
  }

}