import { FC } from 'react';
import Image from 'next/image';

const GithubSnake: FC = () => {
  return (
    <Image
      loader={({ src }) => src}
      alt="GitHub Snake"
      src="https://raw.githubusercontent.com/Robilol/perso/output/github-contribution-grid-snake.svg"
      className="mx-auto h-20 w-full max-w-xl p-2 md:h-24 lg:h-36"
      width={200}
      height={200}
    />
  );
};

export default GithubSnake
