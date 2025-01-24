import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { SiMalt } from 'react-icons/si';
import { FC } from 'react';

const SocialIcons: FC<{
  data: { github: string, linkedin: string, malt: string }
  rounded?: boolean
}> = ({ data, rounded = false }) => {
  if (!data) return null;

  return (
    <ul className="mb-0 inline-flex list-none flex-wrap gap-3 pl-0 sm:gap-4">
      {data.github && (
        <li className="inline-block align-middle">
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-block h-14 w-14 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body ${
              rounded ? 'rounded-full' : 'rounded'
            }`}
          >
            <span className="front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
              <RiGithubFill size={48} className="inline-block" />
            </span>
            <span className="back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
              <RiGithubFill size={48} className="inline-block" />
            </span>
          </a>
        </li>
      )}
      {data.linkedin && (
        <li className="inline-block align-middle">
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-block h-14 w-14 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body ${
              rounded ? 'rounded-full' : 'rounded'
            }`}
          >
            <span className="front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
              <RiLinkedinBoxFill size={48} className="inline-block" />
            </span>
            <span className="back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
              <RiLinkedinBoxFill size={48} className="inline-block" />
            </span>
          </a>
        </li>
      )}
      {data.malt && (
        <li className="inline-block align-middle">
          <a
            href={data.malt}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-block h-14 w-14 overflow-hidden border border-white border-opacity-10 text-center align-middle text-lg leading-none text-body ${
              rounded ? 'rounded-full' : 'rounded'
            }`}
          >
            <span className="front relative left-0 top-0 flex h-full w-full translate-y-0 transform items-center justify-center rounded bg-grey transition-all duration-500 group-hover:-translate-y-full">
              <SiMalt size={48} className="inline-block" />
            </span>
            <span className="back absolute left-0 top-0 flex h-full w-full translate-y-full items-center justify-center rounded bg-primary text-grey transition-all duration-500 group-hover:translate-y-0">
              <SiMalt size={48} className="inline-block" />
            </span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default SocialIcons
