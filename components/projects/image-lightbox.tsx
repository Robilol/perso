'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { RiArrowLeftLine, RiArrowRightLine, RiCloseLine, RiZoomInLine } from 'react-icons/ri'
import { SanityImage, type SanityImageData } from '@/components/sanity-image'

const OpenImageContext = createContext<(index: number) => void>(() => {})

const CONTROL_CLASSES =
  'grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-xl text-ink shadow-brutal transition-[translate,box-shadow] duration-150 hover:-translate-0.5 hover:shadow-brutal-md active:translate-0.5 active:shadow-brutal-sm focus-visible:outline-paper'

/** Distance minimale (px) d'un glissement du doigt pour changer d'image */
const SWIPE_THRESHOLD = 50

/**
 * Visionneuse plein écran : les `LightboxTrigger` placés dans `children` ouvrent l'image de leur
 * index, puis les images défilent avec les flèches (boutons ou clavier) ou d'un glissement du doigt.
 */
export function Lightbox({
  images,
  children,
}: {
  images: (SanityImageData & { alt: string })[]
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)
  const [index, setIndex] = useState<number | null>(null)
  const count = images.length

  // Ouverture après le rendu de l'image : le focus va au bouton « Fermer »
  useEffect(() => {
    const dialog = dialogRef.current
    if (index !== null && dialog && !dialog.open) dialog.showModal()
  }, [index])

  const close = () => dialogRef.current?.close()
  const go = (step: number) =>
    setIndex((current) => (current === null ? current : (current + step + count) % count))

  // Un clic à côté de l'image ferme la visionneuse
  const closeOnBackdrop = (event: MouseEvent) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <OpenImageContext value={setIndex}>
      {children}

      <dialog
        ref={dialogRef}
        aria-label="Images du projet"
        onClose={() => setIndex(null)}
        onClick={closeOnBackdrop}
        onKeyDown={(event) => {
          if (count < 2) return
          if (event.key === 'ArrowLeft') go(-1)
          if (event.key === 'ArrowRight') go(1)
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-paper transition-opacity duration-200 backdrop:bg-ink/90 backdrop:backdrop-blur-sm starting:open:opacity-0"
      >
        {index !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
              <p className="font-mono text-sm tracking-widest" aria-live="polite">
                {count > 1 && (
                  <>
                    <span className="sr-only">Image </span>
                    {padNumber(index + 1)}
                    <span aria-hidden> / </span>
                    <span className="sr-only"> sur </span>
                    {padNumber(count)}
                  </>
                )}
              </p>
              <button type="button" onClick={close} className={CONTROL_CLASSES}>
                <RiCloseLine aria-hidden />
                <span className="sr-only">Fermer</span>
              </button>
            </div>

            <div
              className="min-h-0 flex-1 overflow-hidden"
              onTouchStart={(event) => {
                touchStartX.current = event.touches[0].clientX
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null || count < 2) return
                const distance = event.changedTouches[0].clientX - touchStartX.current
                touchStartX.current = null
                if (Math.abs(distance) > SWIPE_THRESHOLD) go(distance < 0 ? 1 : -1)
              }}
            >
              <div
                className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(${-index * 100}%)` }}
              >
                {images.map((image, position) => (
                  <div
                    key={image.asset?._id ?? position}
                    inert={position !== index}
                    onClick={closeOnBackdrop}
                    className="flex h-full w-full shrink-0 items-center justify-center px-4 sm:px-6"
                  >
                    {/* Image affichée et ses voisines : la suivante est déjà chargée quand elle arrive */}
                    {Math.abs(position - index) <= 1 && (
                      <div className="max-w-full overflow-hidden rounded-xl border-2 border-ink bg-white shadow-[8px_8px_0_0_var(--color-paper)]">
                        <SanityImage
                          image={image}
                          loading="eager"
                          sizes={isPortrait(image) ? '(min-width: 768px) 40vw, 100vw' : '100vw'}
                          className="block h-auto max-h-[calc(100dvh-10.5rem)] w-auto max-w-full"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
              {count > 1 && (
                <button type="button" onClick={() => go(-1)} className={CONTROL_CLASSES}>
                  <RiArrowLeftLine aria-hidden />
                  <span className="sr-only">Image précédente</span>
                </button>
              )}
              <p className="mx-auto line-clamp-2 max-w-2xl text-center text-sm text-pretty text-paper/80">
                {images[index].alt}
              </p>
              {count > 1 && (
                <button type="button" onClick={() => go(1)} className={CONTROL_CLASSES}>
                  <RiArrowRightLine aria-hidden />
                  <span className="sr-only">Image suivante</span>
                </button>
              )}
            </div>
          </div>
        )}
      </dialog>
    </OpenImageContext>
  )
}

/** Bouton qui recouvre une image (parent positionné) et l'ouvre dans la visionneuse */
export function LightboxTrigger({ index, label }: { index: number; label: string }) {
  const open = useContext(OpenImageContext)

  return (
    <button
      type="button"
      onClick={() => open(index)}
      className="group/zoom absolute inset-0 z-10 cursor-zoom-in focus-visible:-outline-offset-4"
    >
      <span className="sr-only">Agrandir l’image : {label}</span>
      <span
        aria-hidden
        className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full border-2 border-ink bg-white text-lg text-ink shadow-brutal-sm transition-opacity duration-200 pointer-fine:opacity-0 pointer-fine:group-hover/zoom:opacity-100 pointer-fine:group-focus-visible/zoom:opacity-100"
      >
        <RiZoomInLine />
      </span>
    </button>
  )
}

function isPortrait(image: SanityImageData) {
  const dimensions = image.asset?.metadata?.dimensions
  return dimensions ? dimensions.height > dimensions.width : false
}

function padNumber(value: number) {
  return String(value).padStart(2, '0')
}
