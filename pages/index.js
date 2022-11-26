import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-[512px] mx-auto p-10 bg-white rounded-lg">
      <Head>
        <title>Peter's Dreambooth Studio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <h1 className="text-center text-7xl pb-3">🎨</h1> */}
      <p className="pb-5 text-lg">
        <strong>Peter's Dreambooth</strong> is a process where missing parts of an
        artwork are filled in to present a complete image. This{" "}
        <a className="underline" href="https://dreambooth.github.io/">
          open-source model
        </a>{" "}
        is trained on individuals to create avatars and portraits. Use password for access.
      </p>
      <p className="pb-5 text-lg">
        Want in? Email peter (at) promptloop.com with 5-10 pictures of your face in various profiles.
      </p>

      {/* <ol className="list-decimal pl-5">
        <li className="mb-2">
          Enter a text prompt to generate an image, or upload your own starting
          image.
        </li>
        <li className="mb-2">
          Click and drag with your mouse to erase unwanted parts of the image.
        </li>
        <li className="mb-2">
          Refine your text prompt (or leave it untouched) and let the model
          generate a new inpainted image.
        </li>
      </ol> */}

      <Link href="/generate">
        <a className="py-3 block text-center bg-black text-white rounded-md mt-10">
          Enter
        </a>
      </Link>
    </div>
  );
}
