import { useState } from "react";

const samplePrompts = [
  "Mad Max, Oscar nominated, intense, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, art by artgerm and greg rutkowski and alphonse mucha, 8k",
  "Disney Pixar, Award winning, intense, intricate, elegant, highly detailed, digital painting, artstation, concept art, smooth, sharp focus, illustration, 8k",
];
import sample from "lodash/sample";

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));
  const [modelCode, setModelCode] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={props.onSubmit}
      className="py-5 animate-in fade-in duration-700"
    >
      <div className="flex max-w-[512px] grid grid-cols-1 gap-5">
        <input
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a prompt..."
          className="block w-full flex-grow rounded-l-md"
        />

        <input
          type="text"
          defaultValue={modelCode}
          onChange={(e) => setModelCode(e.target.value)}
          name="version"
          placeholder="Enter Model Code..."
          className="block w-full flex-grow rounded-l-md"
        />

        <button
          className="bg-black text-white rounded-r-md text-small inline-block px-3 flex-none"
          type="submit"
        >
          Generate
        </button>
        {loading && (
          <p className="text-center text-sm py-10">
            Loading...
          </p>
        )}
      </div>
    </form>
  );
}
