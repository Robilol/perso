import { RiDoubleQuotesL } from 'react-icons/ri'
import { SanityImage } from '@/components/sanity-image'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { initials } from '@/lib/site'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: HOME_QUERY_RESULT['testimonials']
}) {
  if (testimonials.length === 0) return null

  return (
    <section aria-labelledby="temoignages-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="temoignages-title"
          eyebrow="Témoignages"
          title="Ils en parlent mieux que moi"
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li key={testimonial._id}>
              <figure className="flex h-full flex-col rounded-2xl border-2 border-ink bg-white p-6 shadow-brutal sm:p-8">
                <RiDoubleQuotesL aria-hidden className="text-4xl text-mint" />
                <blockquote className="mt-3 flex-1 text-lg text-pretty">
                  {testimonial.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t-2 border-dashed border-ink/20 pt-5">
                  <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-ink bg-sun font-heading text-sm">
                    {testimonial.image?.asset ? (
                      <SanityImage
                        image={testimonial.image}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    ) : (
                      initials(...testimonial.name.split(' ').slice(0, 2))
                    )}
                  </span>
                  <span>
                    <span className="block font-semibold">{testimonial.name}</span>
                    {testimonial.meta && (
                      <span className="block text-sm text-muted">{testimonial.meta}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
