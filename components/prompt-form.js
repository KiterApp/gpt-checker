import { useState } from "react";
import Cookies from "js-cookie";

const samplePrompts = [
  "Mad Max, Oscar nominated, intense, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, art by artgerm and greg rutkowski and alphonse mucha, 8k",
  "Disney Pixar, Award winning, intense, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, 8k",
];
import sample from "lodash/sample";

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));
  const [modelCode, setModelCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const modelCookie = Cookies.get("model");

  return (
    <form
      onSubmit={props.onSubmit}
      className="py-5 animate-in fade-in duration-700"
    >
      <div className="flex max-w-[512px] grid grid-cols-1 gap-5">
        <div>
        <p
          className="text-sm text-gray-500 pb-2"
        >
          Describe the image you want, these examples are a good place to start.
        </p>
        <textarea
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a prompt..."
          className="block w-full flex-grow rounded-l-md p-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          // three lines
          rows="5"
        />
        </div>

        <input
          type="text"
          defaultValue={modelCookie || modelCode}
          onChange={(e) => setModelCode(e.target.value)}
          name="version"
          placeholder="Enter Model Code..."
          className="block w-full flex-grow rounded-l-md"
        />

        <button
          className="bg-black text-white rounded-md py-2 text-small inline-block px-3 flex-none"
          type="submit"
          onClick={() => setLoading(true)}
        >
          Generate
        </button>
      </div>
    </form>
  );
}
