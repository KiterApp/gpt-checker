import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'


export default function PromptForm(props) {
  const [result, setResult] = useState('')
  const [checkText, setCheckText] = useState('')
  const [resultEmojiArray, setResultEmojiArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState('low')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    setResult('')
    setResultEmojiArray([])
    setError('')
    setRange('')
    setLoading(true)
    e.preventDefault()

    let requestContents = { "model": 139, "version": 440, "account": -1, "input_sequence" : e.target.prompt.value};
  
      let axiosConfig = {
        headers: {
            'Authorization': "mung",
            'Content-Type': 'application/json'
        }
    };

    // fetch to gpt-checker api
    const res = await axios.post('https://public-zoo-server-fgkue36c2q-uc.a.run.app/', requestContents, axiosConfig);

    const result = await res.data
    console.log('result', result)

    if (result === 'ERROR') {
      setLoading(false)
      setError('ERROR')
      return
    }
    console.log('result', result.response.response)
    const score = result?.response?.response['LABEL_0']

    const percentage = Math.max(1,Math.round(score * 100).toFixed(0))
    // create an array 1/10 depending on the size of the percentage
    const resultEmojiArray = []
    for (let i = 0; i < percentage / 10; i++) {
      resultEmojiArray.push('🤖')
    }
    const range = percentage < 60 ? 'Low' : percentage < 80 ? 'Medium' : 'High'
    setRange(range)
    setLoading(false)
    setResultEmojiArray(resultEmojiArray)

    setResult(percentage)
  }

  return (
    <>
      {/* Container */}
      <div className="container w-full mx-auto p-5 pt-20 flex flex-col">
        <div className="max-w-[512px] sm:max-w-7xl mx-auto pb-5 flex flex-col">
          <h1
            className="text-center flex text-4xl text-orange-500"
          >
            <MagnifyingGlassIcon
              className="icon text-4xl mt-1 text-orange-500 mr-3"
              height={25}
              width={25}
            />
            GPT Detector
            {error}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="animate-in fade-in duration-700 pb-5"
          >
            <div className="flex max-w-[512px] sm:max-w-7xl grid grid-cols-1 gap-5">
              <div>
              <h3
                className="text-lg text-gray-500 py-5"
              >
                Detect whether text is likely written by a GPT model like GPT-3 or chatGPT. Paste text below to run it against the model.
              </h3>
              <textarea
                defaultValue=''
                name="prompt"
                placeholder="Paste text that you want to check..."
                className="block w-full flex-grow rounded-l-md p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                // three lines
                rows={15}
              />
              </div>
            </div>
            <div className="flex flex-row justify-start py-5 text-xl text-gray-500">
              {loading && 'Loading...'}
              {!loading && resultEmojiArray.length > 0 ? (
                <>
                <p className='text-2xl'>
                {resultEmojiArray.length > 0 && 'Likelihood: '}
                {range}
                {'   '}
                {resultEmojiArray}
                </p>
                <p className='text-2xl'>
                {'   '}
                {result}
                {'  %'}
                </p>
                </>
              ) : (
                <>
                {error}
                </>
              )}
            </div>
            <button
              className="text-white w-full bg-blue-400 text-center cursor-pointer hover:bg-blue-500 rounded-md py-2 text-small inline-block px-3 flex-none"
              type="submit"
            >
              Run Check
            </button>
          </form>
        </div>
        {/* Loading  */}
      </div>
    </>
  );
}
