import FsLightbox from 'fslightbox-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { RiExternalLinkLine, RiImageLine, RiVideoLine } from 'react-icons/ri'
import { Portal } from 'react-portal'
import { imageLoader, shimmer, toBase64 } from '../../lib/utils'
import { Portfolio } from '../../types'

const Portfolio: FC<{ portfolio: Portfolio }> = ({
  portfolio: {
    title,
    subtitle,
    coverimage,
    imagegallery,
    videogallery,
    url,
    tags
  },
}) => {
  const [videoGalleryOpen, setVideoGalleryOpen] = useState(false)
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false)

  return (
    <div className="portfolio card hovercard group p-4 md:p-5">
      <div className="portfolio-top relative overflow-hidden">
        <div
          className="portfolio-image max-h-[300px] fiximage blur-0 filter transition-all duration-500 group-hover:blur">
          <Image
            loader={imageLoader}
            unoptimized={true}
            src={coverimage}
            height={384}
            width={550}
            alt={title}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(550, 384)
            )}`}
          />
        </div>
        <div
          className="portfolio-hovercontent absolute left-0 top-0 z-20 flex h-full w-full -translate-x-full transform items-center justify-center gap-4 overflow-hidden bg-grey bg-opacity-80 transition-all duration-500 group-hover:translate-x-0">
          {imagegallery.length ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setImageGalleryOpen(true)}
            >
              <RiImageLine/>
            </button>
          ) : null}
          {videogallery ? (
            <button
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey"
              onClick={() => setVideoGalleryOpen(true)}
            >
              <RiVideoLine/>
            </button>
          ) : null}
          {url ? (
            (<Link
              href={url}
              target="_blank"
              className="inline-flex h-10 min-h-0 w-10 items-center justify-center rounded-full bg-primary p-0 text-center text-lg text-grey">

              <RiExternalLinkLine/>

            </Link>)
          ) : null}
        </div>
      </div>
      <div className="portfolio-content mt-4">
        <h5 className="mb-0">{title}</h5>
        <p>{subtitle}</p>
        <div className="flex flex-row gap-2">{tags?.map((tag) => <span
          className="bg-primary bg-opacity-10 text-xs rounded px-1">{tag}</span>)}
        </div>

      </div>
      {imagegallery && (
        <Portal>
          <FsLightbox toggler={imageGalleryOpen} sources={imagegallery}/>
        </Portal>
      )}
      {videogallery && (
        <Portal>
          <FsLightbox toggler={videoGalleryOpen} sources={videogallery}/>
        </Portal>
      )}
    </div>
  )
}

export default Portfolio
