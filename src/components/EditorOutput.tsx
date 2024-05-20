"use client"

import dynamic from "next/dynamic"
import { FC, useEffect } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"

const Output = dynamic(async () => await import("editorjs-react-renderer"), {
  ssr: false,
})

interface EditorOutputProps {
  content: any
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

import Image from "next/image"

function CustomImageRenderer({ data }: any) {
  return (
    <div className="relative w-full min-h-[15rem]">
      <Image
        width={500}
        height={500}
        src={data.file.url}
        alt={data.caption}
        className="object-contain"
      />
    </div>
  )
}

function CustomCodeRenderer({ data }: any) {
  useEffect(() => {
    hljs.highlightAll()
  }, [])
  return (
    <pre className="rounded-md">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  )
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      style={style}
      data={content}
      className="text-sm"
      renderers={renderers}
    />
  )
}

export default EditorOutput
