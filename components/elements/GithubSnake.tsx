import { FC } from 'react'
import Image from "next/image";


const GithubSnake: FC = () => {
  return (
    <Image
      loader={({ src }) => src}
      alt="GitHub Snake"
      src="https://raw.githubusercontent.com/Robilol/perso/output/github-contribution-grid-snake.svg"
      className="w-full mx-auto max-w-xl h-20 md:h-24 lg:h-36 p-2"
      width={200}
      height={200}
    />
  )
}

export default GithubSnake