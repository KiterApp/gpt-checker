import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Canvas from "components/canvas";
import PromptForm from "components/prompt-form";
import Download from "components/download";
import { XCircle as StartOverIcon } from "lucide-react";
import { Code as CodeIcon } from "lucide-react";
import { Rocket as RocketIcon } from "lucide-react";
import Cookies from "js-cookie";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    setLoading(true);
    Cookies.set("model", e.target.version.value);

    const prevPrediction = predictions[predictions.length - 1];
    const prevPredictionOutput = prevPrediction?.output
      ? prevPrediction.output[prevPrediction.output.length - 1]
      : null;

    const body = {
      prompt: e.target.prompt.value,
      version: e.target.version.value
    };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([prediction]));

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));

      if (prediction.status === "succeeded") {
        setUserUploadedImage(null);
      }
    }
  };

  const startOver = async (e) => {
    e.preventDefault();
    setLoading(false);
    setPredictions([]);
    setError(null);
    setMaskImage(null);
    setUserUploadedImage(null);
  };

  return (
    <div>
      <Head>
        <title>Peter&apos;s Dreambooth - use your code</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="container mx-auto p-5">
        {error && <div>{error}</div>}

        <div className="max-w-[512px] mx-auto py-10">
          <h1
            className="text-center flex text-xl text-gray-600"
          >
            <RocketIcon /> {' - '}The Dreambooth {predictions.length}
          </h1>
          <PromptForm onSubmit={handleSubmit} />

          <div className="text-center text-2xl">
            {((predictions.length > 0 &&
              predictions[predictions.length - 1].output) ||
              maskImage ||
              userUploadedImage) && (
              <button className="lil-button" onClick={startOver}>
                <StartOverIcon className="icon text-2xl" />
                Start over
              </button>
            )}

            <Download predictions={predictions} />
            {!loading ? (
              <p
                className="text-sm text-gray-500 pb-10"
              >
                Need a model? Email 5-10 high quality photos of your profile (just of you) to peter at promptloop dot com.
              </p>
            ) : (
              <div className="flex justify-center items-center text-sm text-gray-500">
                {(!predictions.length > 1 &&
                  <p>
                    ✨ Generating your image....  (takes around 30 seconds)
                  </p>
                )}
              </div>
            )}
            <Link href="https://promptloop.com">
              <a
                className="lil-button py-10 pt-20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeIcon className="icon" />
                Made with ❤️ by the Promptloop team
              </a>
            </Link>
          </div>
        </div>
        {/* Loading  */}
      </main>
    </div>
  );
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}
