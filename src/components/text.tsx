import React from "react"

interface TextProps {
  text: string
}

const Text: React.FC<TextProps> = ({ text }) => {
  return <div>{text}</div>
}

export default Text
