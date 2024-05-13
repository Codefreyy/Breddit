"use client"

import TextareaAutosize from "react-textarea-autosize"
import { useForm } from "react-hook-form"
import { PostCreationType, PostValidator } from "@/lib/validators/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useRef, useState } from "react"
import type EditorJS from "@editorjs/editorjs"
import { uploadFiles } from "@/lib/uploadthing"
import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export function Editor({ subredditId }: { subredditId: string }) {
  const ref = useRef<EditorJS>()
  const [isMounted, setIsMount] = useState(false)
  const pathName = usePathname()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreationType>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: "",
      content: null,
      subredditId,
    },
  })

  const editorInitializer = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          list: List,
          embed: Embed,
          table: Table,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], "imageUploader")

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  }
                },
              },
            },
          },
          code: Code,
          inlineCode: InlineCode,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const init = async () => {
      await editorInitializer()
      setTimeout(() => {
        // set focus to title
        _titleRef.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        if (ref.current) {
          ref.current.destroy() // clean the resources the editor instance used
          ref.current = undefined // remove the reference
        }
      }
    }
  }, [isMounted, editorInitializer])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMount(true)
    }
  }, [setIsMount])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        toast({
          title: "Error",
          description: (value as { message: string }).message,
        })
      }
    }
  }, [errors])

  // share the ref with react-hook-form register
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const { ref: titleRef, ...rest } = register("title")

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content, subredditId }: PostCreationType) => {
      const payload: PostCreationType = {
        title,
        content,
        subredditId,
      }
      const { data } = await axios.post("/api/subreddit/post/create", payload)

      return data
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Your post was not published. Please try again later.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      const newPathName = pathName.split("/").slice(0, -1).join("/")
      router.push(newPathName)

      router.refresh()
      return toast({
        title: "Success",
        description: "Your post has been published.",
      })
    },
  })

  async function onSubmit(data: PostCreationType) {
    const blocks = await ref.current?.save()
    const payload: PostCreationType = {
      title: data.title,
      content: blocks,
      subredditId,
    }

    createPost(payload)
  }

  return (
    <div className="w-full p-4 bg-zinc-50 border-zinc-200 border rounded-lg">
      <form
        id="subreddit-post-form"
        className="w-fit"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />

          <div id="editor" className="min-h-[500px]" />
        </div>
      </form>
    </div>
  )
}
