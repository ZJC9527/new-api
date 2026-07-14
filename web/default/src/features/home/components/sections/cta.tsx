/*
 * NovAPI — Minimal call-to-action section.
 */
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-2xl text-center'>
        <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
          {t('Ready to build with')}{' '}
          <span className='novapi-gradient-text'>{t('NovAPI')}</span>
          {t('?')}
        </h2>
        <p className='text-muted-foreground mt-4 text-sm md:text-base'>
          {t('Start for free. Scale when you need to.')}
        </p>
        <div className='mt-8'>
          <Button
            size='lg'
            className='novapi-glow group h-12 rounded-xl px-8 text-sm font-medium'
            render={<Link to='/sign-up' />}
          >
            {t('Create Account')}
            <ArrowRight className='ml-2 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
        </div>
      </div>
    </section>
  )
}
