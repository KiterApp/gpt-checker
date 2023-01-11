import { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useDebounce } from 'use-debounce';


export default function PromptForm(props) {
  const [result, setResult] = useState('')
  const [checkText, setCheckText] = useState('')
  const [resultEmojiArray, setResultEmojiArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState('low')
  const [error, setError] = useState('')
  const [input, setInput] = useState('')
  const [validated, setValidated] = useState(false)
  const debouncedQuery = useDebounce(input, 500);


  const handleValidation = (value) => {
    // post to response endpoint
    const data = {
      input_string: input || '',
      user_validation: value || false,
      result: result,
    }
    fetch('/api/gpt-checker/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    setValidated(true)
  }


  const handleSubmit = async (e) => {
    setValidated(false)
    setResult('')
    setResultEmojiArray([])
    setError('')
    setRange('')
    setLoading(true)
    e.preventDefault()
    // fetch to gpt-checker api
    const res = await axios('/api/gpt-checker', {
      method: 'POST',
      data: {
        text: e.target.prompt.value,
      }
    })

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
                onChange={(e) => setInput(e.target.value)}
                rows={15}
              />
              </div>
            </div>
            {/* Warning helper text */}
            <div className="flex flex-row justify-start pb-2 text-orange-500">
              {input.length > 0 && input.length < 50 && 'Text is too short. Try adding more text for more accurate results.'}
              {input.length > 1500 && 'The tool can only process up to 1500 characters. Try removing some text.'}
            </div>
            <button
              className="mt-2 text-white w-full bg-blue-400 text-center cursor-pointer hover:bg-blue-500 rounded-md py-2 text-small inline-block px-3 flex-none"
              type="submit"
            >
              Run Check
            </button>
          </form>
          <div className='sm:grid sm:grid-cols-2 sm:gap-4 sm:items-start sm:pt-5'>
              <div className="flex flex-row justify-start py-2 text-xl text-gray-500">
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
              {/* Buttons */}
              {!loading && resultEmojiArray.length > 0 && (
                <div className='flex flex-row md:justify-end py-2 pb-2 text-xl text-gray-500 space-x-5'>
                  {!validated ? (
                    <>
                  <div
                    className="inline-flex text-sm font-medium text-gray-50 items-center rounded-md w-full md:w-auto px-10 py-2 border border-gray-200 hover:text-gray-900 hover:border-gray-600 bg-green-500 hover:bg-white transition duration-150 ease-in-out justify-center align-middle cursor-pointer"
                    onClick={() => handleValidation(true)}
                  >
                    Correct!
                  </div>
                  <div
                    className="inline-flex text-sm font-medium text-gray-50 items-center rounded-md w-full md:w-auto px-10 py-2 border border-gray-200 hover:text-gray-900 hover:border-gray-600 bg-red-500 hover:bg-white transition duration-150 ease-in-out justify-center align-middle cursor-pointer"
                    onClick={() => handleValidation(false)}
                  >
                    Wrong!
                  </div>
                  </>
                  ) : (
                    <p>
                      Thank you for your feedback!
                    </p>
                  )}

                </div>
              )}
            </div>
        </div>
        {/* Loading  */}
      </div>
    </>
  );
}
