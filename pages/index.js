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
        <title>GPT Detector | Free tool to tell if text is written by AI like GPT-3</title>
        <meta name="description" content="Detect if text is likely written by a GPT model like GPT-3 or chatGPT or AI writing tool. Free tool to detect if text is AI generated." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
          <PromptForm />

          <div className="text-center text-2xl">
            <p className="lil-button">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://promptloop.com"
              >
                <HeartFilledIcon className="icon" />
                Made by the Promptloop team
              </a>
              <a
                className="ml-2"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.pyqai.com/"
              >
                <CodeIcon className="icon" />
                and Powered by Pyq AI
              </a>
            </p>
        </div>
    </div>
  );
}
