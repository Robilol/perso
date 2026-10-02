import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

const INK = '#141414'
const PAPER = '#faf7f0'
const MINT = '#72e2ae'
const MUTED = '#57534e'

type OgFont = { name: string; data: ArrayBuffer; weight: 500 | 800; style: 'normal' }

/** Instance statique d'Archivo (largeur, graisse) réduite aux caractères utilisés : Satori ne lit pas les polices variables */
async function loadArchivo(text: string, width: number, weight: 500 | 800): Promise<OgFont> {
  const family = `Archivo:wdth,wght@${width},${weight}`
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
  ).then((response) => response.text())
  const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!source) throw new Error(`Police ${family} introuvable`)
  const data = await fetch(source).then((response) => response.arrayBuffer())
  return { name: weight === 800 ? 'Archivo Expanded' : 'Archivo', data, weight, style: 'normal' }
}

async function loadFonts(text: string) {
  try {
    return await Promise.all([loadArchivo(text, 125, 800), loadArchivo(text, 100, 500)])
  } catch {
    // Sans accès à Google Fonts, l'image est générée avec la police par défaut
    return []
  }
}

export async function renderOgImage({
  name,
  kicker,
  title,
  description,
  label,
}: {
  name: string
  kicker: string
  title: string
  description?: string | null
  label: string
}) {
  const monogram = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
  const titleSize = title.length > 40 ? 64 : title.length > 22 ? 80 : 104
  const fonts = await loadFonts(
    `${name}${monogram}${kicker}${kicker.toUpperCase()}${title}${description ?? ''}${label}robin-regis.fr`,
  )

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 52,
        backgroundColor: PAPER,
        backgroundImage: `radial-gradient(rgba(20, 20, 20, 0.16) 1.6px, transparent 1.6px)`,
        backgroundSize: '26px 26px',
        fontFamily: 'Archivo',
        color: INK,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '44px 52px',
          backgroundColor: '#ffffff',
          border: `3px solid ${INK}`,
          borderRadius: 32,
          boxShadow: `12px 12px 0 0 ${INK}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 14,
                border: `3px solid ${INK}`,
                backgroundColor: MINT,
                fontFamily: 'Archivo Expanded',
                fontSize: 22,
              }}
            >
              {monogram}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Archivo Expanded', fontSize: 28 }}>
              {name}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: 999,
              border: `3px solid ${INK}`,
              backgroundColor: MINT,
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            {label}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              fontWeight: 500,
              color: MUTED,
              letterSpacing: 2,
            }}
          >
            {kicker.toUpperCase()}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 14,
              fontFamily: 'Archivo Expanded',
              fontSize: titleSize,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                color: MUTED,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', fontSize: 22, fontWeight: 500 }}>robin-regis.fr</div>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  )
}
