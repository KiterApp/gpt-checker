import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PromptForm from "../components/prompt-form";
import { XCircle as StartOverIcon } from "lucide-react";
import { Code as CodeIcon } from "lucide-react";
import { MagnifyingGlassIcon, HeartFilledIcon } from "@radix-ui/react-icons";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {

  return (
    <div>
      <Head>
        <title>GPT Detector</title>
        <meta name="description" content="Detect if text is likely written by a GPT model like GPT-3 or chatGPT to detect if text is AI generated." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
          <PromptForm />

          <div className="text-center text-2xl">
            <p className="lil-button">
            <Link href="https://promptloop.com">
              <a
                target="_blank"
                rel="noopener noreferrer"
              >
                <HeartFilledIcon className="icon" />
                Made by the Promptloop team
              </a>
            </Link>
            <Link href="https://www.pyqai.com/">
              <a
                className="ml-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeIcon className="icon" />
                and Powered by Pyq AI
              </a>
            </Link>
            </p>
        </div>
    </div>
  );
}
