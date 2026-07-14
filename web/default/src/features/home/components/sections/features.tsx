/*
 * NovAPI — Features: model marquee, horizontal steps, pricing comparison
 */
import { ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

const models = [
  'GPT-4o',
  'GPT-4o Mini',
  'Claude 3.5 Sonnet',
  'Claude 3 Opus',
  'Gemini 2.0 Flash',
  'Gemini 1.5 Pro',
  'DeepSeek V3',
  'DeepSeek R1',
  'Qwen 3',
  'Llama 4',
  'Mistral Large',
  'Grok 2',
  'Yi-Lightning',
  'GPT Image 1',
  'DALL-E 3',
  'Stable Diffusion 3',
  'Whisper',
  'TTS-1 HD',
  'Claude Haiku 3.5',
  'Command R+',
  'Moonshot v1',
  'GLM-4',
]



export function Features() {
  const { t } = useTranslation()

  return (
    <>
      {/* Model marquee */}
      <section className='relative z-10 px-6 py-12'>
        <div className='mx-auto max-w-5xl'>
          <div className='relative overflow-hidden'>
            <div className='novapi-marquee flex items-center gap-3'>
              {[...models, ...models].map((model, i) => (
                <span
                  key={`${model}-${i}`}
                  className='border-border/30 bg-card/30 text-muted-foreground shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-sm'
                >
                  {model}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why NovAPI — 4 feature cards in grid */}
      <section className='relative z-10 px-6 py-16 md:py-24'>
        <AnimateInView animation='fade-up'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              {t('Why')}{' '}
              <span className='novapi-gradient-text'>NovAPI</span>
            </h2>
            <p className='text-purple-200/60 mt-3 text-sm md:text-base'>
              {t('Same models, better price, simpler integration.')}
            </p>
          </div>
        </AnimateInView>

        <div className='mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2'>
          {[
            {
              emoji: '🔗',
              title: 'Unified Endpoint',
              desc: 'One base URL for GPT, Claude, Gemini, DeepSeek and 200+ models. Standard OpenAI format.',
            },
            {
              emoji: '⚡',
              title: 'Smart Routing',
              desc: 'Automatic load balancing and failover. Requests always hit the fastest available upstream.',
            },
            {
              emoji: '💰',
              title: 'Cost Effective',
              desc: 'Competitive pricing with no hidden fees. Real-time cost tracking per model and per key.',
            },
            {
              emoji: '🛡️',
              title: 'Production Ready',
              desc: 'Rate limiting, usage quotas, key management, and detailed analytics built in.',
            },
          ].map((card, index) => (
            <AnimateInView key={card.title} animation='fade-up' delay={index * 80}>
              <div className='border-border/30 bg-card/20 hover:border-primary/20 hover:bg-card/40 flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300'>
                <div className='mb-3 text-2xl'>{card.emoji}</div>
                <h3 className='mb-2 text-sm font-semibold'>
                  {t(card.title)}
                </h3>
                <p className='text-muted-foreground text-xs leading-relaxed'>
                  {t(card.desc)}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </section>

      {/* Quick start — horizontal timeline style */}
      <section className='relative z-10 px-6 py-16 md:py-24'>
        <AnimateInView animation='fade-up'>
          <div className='mx-auto mb-12 max-w-2xl text-center'>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              {t('Start in seconds')}
            </h2>
            <p className='text-purple-200/60 mt-3 text-sm md:text-base'>
              {t('Just change your base URL. Your existing OpenAI code works instantly.')}
            </p>
          </div>
        </AnimateInView>

        <AnimateInView animation='fade-up' delay={100}>
          <div className='mx-auto max-w-3xl'>
            <div className='border-border/30 bg-card/20 overflow-hidden rounded-2xl border backdrop-blur-sm'>
              <div className='flex items-center gap-2 border-b border-border/20 px-4 py-3'>
                <div className='size-2.5 rounded-full bg-red-500/60' />
                <div className='size-2.5 rounded-full bg-yellow-500/60' />
                <div className='size-2.5 rounded-full bg-green-500/60' />
                <span className='text-muted-foreground/50 ml-2 text-[10px]'>
                  Python · OpenAI SDK
                </span>
              </div>
              <pre className='overflow-x-auto p-5 text-xs leading-relaxed md:text-sm'>
                <code className='text-foreground/80'>
{`from openai import OpenAI

# Just change the base_url — that's it
client = OpenAI(
    base_url="https://api.novapi.io/v1",
    api_key="sk-your-novapi-key"
)

# Use any model through one endpoint
response = client.chat.completions.create(
    model="gpt-4o",  # or claude-3.5-sonnet, deepseek-v3, etc.
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)`}
                </code>
              </pre>
            </div>

            <div className='mt-6 flex justify-center'>
              <Button
                variant='outline'
                className='border-border/50 hover:border-primary/50 rounded-xl text-sm backdrop-blur-sm'
                render={<Link to='/sign-up' />}
              >
                {t('Try it now')}
                <ArrowRight className='ml-2 size-3.5' />
              </Button>
            </div>
          </div>
        </AnimateInView>
      </section>
    </>
  )
}
