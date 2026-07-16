/*
 * NovAPI — Clean hero with soft animated gradient background.
 */
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6'>
      {/* Content */}
      <div className='relative z-10 mx-auto max-w-5xl text-center'>
        {/* Badge */}
        <div
          className='landing-animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/5 dark:text-emerald-300 opacity-0 backdrop-blur-sm'
          style={{ animationDelay: '200ms' }}
        >
          <span className='relative flex size-1.5'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75' />
            <span className='relative inline-flex size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400' />
          </span>
          <span>{t('Next-Gen AI Infrastructure')}</span>
        </div>

        {/* Main headline */}
        <h1
          className='landing-animate-fade-up text-4xl leading-[1.15] font-bold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl'
          style={{ animationDelay: '500ms' }}
        >
          <span className='text-foreground'>{t('One API for')}</span>{' '}
          <span className='novapi-gradient-text'>
            {t('All AI Models')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className='landing-animate-fade-up mx-auto mt-6 max-w-lg text-base leading-relaxed opacity-0 text-muted-foreground md:text-lg'
          style={{ animationDelay: '800ms' }}
        >
          {t(
            'Access GPT, Claude, Gemini, DeepSeek and more through a single, unified endpoint. Simple pricing, zero complexity.'
          )}
        </p>

        {/* CTA Buttons */}
        <div
          className='landing-animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0'
          style={{ animationDelay: '1100ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              size='lg'
              className='novapi-glow group h-12 rounded-xl px-8 text-sm font-medium'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                size='lg'
                className='novapi-glow group h-12 rounded-xl px-8 text-sm font-medium'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started Free')}
                <ArrowRight className='ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='border-border/50 hover:border-primary/50 h-12 rounded-xl px-8 text-sm font-medium backdrop-blur-sm'
                render={<Link to='/pricing' />}
              >
                {t('View Pricing')}
              </Button>
            </>
          )}
        </div>

        {/* Trust line */}
        <p
          className='landing-animate-fade-up text-muted-foreground/60 mt-8 text-xs opacity-0'
          style={{ animationDelay: '1400ms' }}
        >
          {t('OpenAI-compatible · Pay as you go · No vendor lock-in')}
        </p>
      </div>
    </section>
  )
}
