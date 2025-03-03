import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json('OFFLINE')

  try {
    console.log(req?.body?.text.length, 'characters running')

    const startTime = Date.now();

    var data = JSON.stringify({
      "input_sequence": `${req?.body?.text}`,
      "model": 139,
      "version": 440,
      "account": -1
    });

    const response = await fetch(
      "https://public-zoo-server-fgkue36c2q-uc.a.run.app/",
      {
        headers: {
          Authorization: "mung",
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