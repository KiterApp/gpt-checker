import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'


export default function PromptForm(props) {
  const [result, setResult] = useState('')
  const [checkText, setCheckText] = useState('')
  const [resultEmojiArray, setResultEmojiArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState('low')


  const handleSubmit = async (e) => {
    console.log('submit', e.target.prompt.value)
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
    const score = result[0][0]?.score

    const percentage = Math.round(score * 100).toFixed(0)
    // create an array 1/10 depending on the size of the percentage
    const resultEmojiArray = []
    for (let i = 0; i < percentage / 10; i++) {
      resultEmojiArray.push('🤖')
    }
    const range = percentage < 60 ? 'low' : percentage < 80 ? 'medium' : 'high'
    setRange(range)
    setLoading(false)
    setResultEmojiArray(resultEmojiArray)

    setResult(percentage)
  }

  return (
    <>
      <Head>
        <title>Check if text is GPT generated</title>
        <meta name="description" content="Detect if text is likely written by a GPT model like GPT-3 or chatGPT to detect if text is AI generated." />
      </Head>
      <form
        onSubmit={handleSubmit}
        className="py-5 animate-in fade-in duration-700"
      >
        <div className="flex max-w-[512px] sm:max-w-7xl grid grid-cols-1 gap-5">
          <div>
          <p
            className="text-sm text-gray-500 pb-2"
          >
            Detect if text is likely written by a GPT model like GPT-3 or chatGPT to detect if text is AI generated.
          </p>
          <textarea
            type="text"
            defaultValue=''
            name="prompt"
            placeholder="Enter a prompt..."
            className="block w-full flex-grow rounded-l-md p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            // three lines
            rows="10"
          />
          </div>

          <button
            className="bg-black text-white rounded-md py-2 text-small inline-block px-3 flex-none"
            type="submit"
          >
            Run Check
          </button>
        </div>
      </form>
    </>
  );
}
