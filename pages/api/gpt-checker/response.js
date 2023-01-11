
// Initialize the JS client
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


const logSupabase = async (input_string, user_validation, result) => {
  try {
    const startPG = Date.now()
    console.log('inser data', input_string, user_validation, result || 0)
    const { data: insertData, error: insertError } = await supabase
      .from('responses')
      .insert([
        {
          input_string: input_string,
          user_validation: user_validation,
          model_response: result || 0,
        }
      ])
    const endPG = Date.now()
    console.log('PG time', endPG - startPG, insertData)
  } catch (error) {
    console.log(error, 'error')
  }
}



export default async function handler(
  req,
  res
) {

  try {

    const body = req.body

    const input_string = await body?.input_string
    const user_validation = await req?.body?.user_validation
    const result = await req?.body?.result

    logSupabase(input_string, user_validation, result)
    


    


    
  return res.status(200).json('Success')

  } catch(error) {
    console.log(error, 'error')
    return res.status(200).json('ERROR')
  }

}