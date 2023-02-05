# GPT - Detector

This is an open-source playground to use for detecting GPT generated content. It uses a model trained on both human and GPT generated text.

## How it works

🐢🚀 This is a Node.js app! It's powered by:

- [Pyqai.com](https://pyqai.com) for hosting the model
- Next.js [server-side API routes](pages/api) for talking to the Replicate API
- Next.js React components for the inpainting GUI
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Development

Prerequisites:

1. Recent version of Node.js
2. pyqai Token (running the model)


```
Model TOKEN update
```

Then install dependencies and run the server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
