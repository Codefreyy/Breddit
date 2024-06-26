"use client"

import { useCallback, useRef, useState, useEffect } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Prisma, Subreddit } from "@prisma/client"
import { useRouter, usePathname } from "next/navigation"
import { Users } from "lucide-react"
import debounce from "lodash.debounce"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const SearchBar = ({}) => {
  const [input, setInput] = useState<string>("")
  const router = useRouter()

  const request = debounce(async () => {
    refetch()
  }, 500)

  const debounceRequest = useCallback(() => {
    request()
  }, [])

  const { data, isFetched, refetch } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      if (!input) return []
      const { data } = await axios.get(`/api/search?q=${input}`)
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType
      })[]
    },
    enabled: false,
  })

  const commandRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(commandRef, () => {
    // Add your logic here
    setInput("")
  })

  const pathname = usePathname()

  useEffect(() => {
    setInput("")
  }, [pathname])

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        className="outline-none border-none focus:border-none focus:outline-none ring-0 "
        placeholder="Search Communities..."
        value={input}
        onValueChange={(val) => {
          setInput(val)
          debounceRequest()
        }}
      ></CommandInput>
      {input.length > 0 ? (
        <CommandList className="absolute bg-white inset-x-0 top-full shadow rounded-b-md">
          {isFetched && <CommandEmpty>No results found</CommandEmpty>}

          {data?.length ?? 0 > 0 ? (
            <CommandGroup heading="communities">
              {data?.map((sub) => (
                <CommandItem
                  key={sub.id}
                  onSelect={(e) => {
                    router.push(`/r/${e}`)
                    router.refresh()
                  }}
                  value={sub.name}
                >
                  <Users className="w-4 h-4 mr-2" />
                  <a href={`/r/${sub.name}`}>r/{sub.name} </a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  )
}

export default SearchBar
