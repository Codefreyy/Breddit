"use client"

import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/Button"

const CloseModal = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      variant="subtle"
      aria-label="close modal"
    >
      <X className="w-4 h-4 p-0 rounded-md" />
    </Button>
  )
}

export default CloseModal
