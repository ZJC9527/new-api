/*
 * NovAPI — Auth layout with header, left brand panel + right form card.
 */
import { Link } from '@tanstack/react-router'

import { PublicHeader } from '@/components/layout'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative h-svh max-w-none overflow-hidden'>

      {/* Header navigation */}
      <PublicHeader />

      {/* Main content */}
      <div className='grid h-[calc(100vh-3rem)] lg:grid-cols-2'>

      {/* Left panel — brand messaging (hidden on mobile) */}
      <div className='hidden flex-col items-center justify-center p-12 lg:flex'>
        <div className='max-w-md space-y-8 text-center'>
          <Link to='/' className='inline-flex items-center gap-2'>
            <img
              src='/logo.svg'
              alt='NovAPI'
              className='h-10 w-10 rounded-lg object-cover'
            />
            <span className='text-xl font-semibold text-purple-100'>
              NovAPI
            </span>
          </Link>

          <div className='space-y-4'>
            <h2 className='novapi-gradient-text text-3xl font-bold leading-tight xl:text-4xl'>
              全部 AI 模型<br />一个 API 搞定
            </h2>
            <p className='text-sm leading-relaxed text-purple-200/60'>
              通过统一端点访问 GPT、Claude、Gemini、DeepSeek 等 200+ 模型。无供应商锁定，按量计费。
            </p>
          </div>

          <div className='flex items-center justify-center gap-6 text-xs text-purple-300/50'>
            <span className='flex items-center gap-1.5'>
              <span className='inline-block size-1.5 rounded-full bg-green-400/80' />
              99.9% 可用性
            </span>
            <span>200+ 模型</span>
            <span>50+ 服务商</span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-8'>
        {/* Mobile logo */}
        <Link
          to='/'
          className='mb-8 flex items-center gap-2 lg:hidden'
        >
          <img
            src='/logo.svg'
            alt='NovAPI'
            className='h-8 w-8 rounded-lg object-cover'
          />
          <span className='text-lg font-semibold text-purple-100'>
            NovAPI
          </span>
        </Link>

        <div className='border-purple-500/20 bg-[oklch(0.25_0.04_275_/_50%)] shadow-[0_0_50px_oklch(0.5_0.15_275_/_15%)] w-full max-w-[420px] space-y-2 rounded-2xl border px-6 py-8 backdrop-blur-lg sm:px-8'>
          {children}
        </div>
      </div>
      </div>
    </div>
  )
}
