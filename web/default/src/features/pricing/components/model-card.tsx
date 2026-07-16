/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { ChevronRight, Copy } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { getLobeIcon } from '@/lib/lobe-icon'
import { cn } from '@/lib/utils'

import { DEFAULT_TOKEN_UNIT } from '../constants'
import {
  getDynamicDisplayGroupRatio,
  getDynamicPricingSummary,
} from '../lib/dynamic-price'
import { parseTags } from '../lib/filters'
import { isTokenBasedModel } from '../lib/model-helpers'
import { formatPrice, formatRequestPrice } from '../lib/price'
import type { PricingModel, TokenUnit } from '../types'
import { ModelBillingModeBadge } from './model-billing-mode-badge'
import { ModelPerfBadge, type ModelPerfBadgeData } from './model-perf-badge'

export interface ModelCardProps {
  model: PricingModel
  onClick: () => void
  priceRate?: number
  usdExchangeRate?: number
  tokenUnit?: TokenUnit
  showRechargePrice?: boolean
  selectedGroup?: string
  perf?: ModelPerfBadgeData
}

export const ModelCard = memo(function ModelCard(props: ModelCardProps) {
  const { t } = useTranslation()
  const { copyToClipboard } = useCopyToClipboard()
  const tokenUnit = props.tokenUnit ?? DEFAULT_TOKEN_UNIT
  const priceRate = props.priceRate ?? 1
  const usdExchangeRate = props.usdExchangeRate ?? 1
  const showRechargePrice = props.showRechargePrice ?? false
  const isTokenBased = isTokenBasedModel(props.model)
  const tokenUnitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const tags = parseTags(props.model.tags)
  const groups = props.model.enable_groups || []
  const endpoints = props.model.supported_endpoint_types || []
  const modelIconKey = props.model.icon || props.model.vendor_icon
  const modelIcon = modelIconKey ? getLobeIcon(modelIconKey, 28) : null
  const initial = props.model.model_name?.charAt(0).toUpperCase() || '?'
  const isDynamicPricing =
    props.model.billing_mode === 'tiered_expr' &&
    Boolean(props.model.billing_expr)
  const hasCachedPrice = isTokenBased && props.model.cache_ratio != null
  const dynamicSummary = isDynamicPricing
    ? getDynamicPricingSummary(props.model, {
        tokenUnit,
        showRechargePrice,
        priceRate,
        usdExchangeRate,
        groupRatioMultiplier: getDynamicDisplayGroupRatio(
          props.model,
          props.selectedGroup
        ),
      })
    : null

  const primaryGroup = groups[0]
  const bottomTags = [...tags.slice(0, 3)]
  const hiddenCount =
    Math.max(groups.length - 1, 0) +
    Math.max(endpoints.length - 2, 0) +
    Math.max(tags.length - 2, 0)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    copyToClipboard(props.model.model_name || '')
  }

  let priceSummary: ReactNode
  if (dynamicSummary) {
    if (dynamicSummary.isSpecialExpression) {
      priceSummary = (
        <span className='min-w-0'>
          <span className='text-amber-700 dark:text-amber-300'>
            {t('Special billing expression')}
          </span>
          <code className='text-muted-foreground/70 mt-0.5 line-clamp-1 block font-mono text-[11px] break-all'>
            {dynamicSummary.rawExpression}
          </code>
        </span>
      )
    } else if (dynamicSummary.primaryEntries.length > 0) {
      priceSummary = (
        <>
          {dynamicSummary.primaryEntries.map((entry) => (
            <span
              key={entry.key}
              className='text-muted-foreground whitespace-nowrap'
            >
              {t(entry.shortLabel)}{' '}
              <span className='text-foreground font-mono font-semibold'>
                {entry.formatted}
              </span>
            </span>
          ))}
        </>
      )
    } else {
      priceSummary = (
        <span className='text-muted-foreground text-sm'>
          {t('Dynamic Pricing')}
        </span>
      )
    }
  } else if (isTokenBased) {
    priceSummary = (
      <>
        <span className='inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground/80'>
          <span className='text-[10px] uppercase tracking-wide'>{t('Input')}</span>
          <span className='text-emerald-700 dark:text-emerald-400 font-medium'>
            {formatPrice(
              props.model,
              'input',
              tokenUnit,
              showRechargePrice,
              priceRate,
              usdExchangeRate,
              props.selectedGroup
            )}
          </span>
        </span>
        <span className='text-border'>·</span>
        <span className='inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground/80'>
          <span className='text-[10px] uppercase tracking-wide'>{t('Output')}</span>
          <span className='text-emerald-700 dark:text-emerald-400 font-medium'>
            {formatPrice(
              props.model,
              'output',
              tokenUnit,
              showRechargePrice,
              priceRate,
              usdExchangeRate,
              props.selectedGroup
            )}
          </span>
        </span>
        {hasCachedPrice && (
          <>
            <span className='text-border'>·</span>
            <span className='inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground/80'>
              <span className='text-[10px] uppercase tracking-wide'>{t('Cached')}</span>
              <span className='text-emerald-700 dark:text-emerald-400 font-medium'>
                {formatPrice(
                  props.model,
                  'cache',
                  tokenUnit,
                  showRechargePrice,
                  priceRate,
                  usdExchangeRate,
                  props.selectedGroup
                )}
              </span>
            </span>
          </>
        )}
      </>
    )
  } else {
    priceSummary = (
      <span className='inline-flex items-center gap-1 whitespace-nowrap text-muted-foreground/80'>
        <span className='text-emerald-700 dark:text-emerald-400 font-medium'>
          {formatRequestPrice(
            props.model,
            showRechargePrice,
            priceRate,
            usdExchangeRate,
            props.selectedGroup
          )}
        </span>
        <span className='text-[10px] uppercase tracking-wide'>/ {t('request')}</span>
      </span>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-card/30 p-4 transition-all duration-300 sm:p-5',
        'hover:-translate-y-1.5 hover:border-emerald-300 hover:bg-card/80 hover:shadow-lg dark:hover:border-emerald-400/40 dark:hover:bg-card/50 dark:hover:shadow-[0_10px_40px_-10px_rgba(52,211,153,0.2)]'
      )}
    >
      {/* Top row: icon + model name */}
      <div className='flex items-center gap-3'>
        <div className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 sm:size-11'>
          {modelIcon || (
            <span className='text-primary/80 text-base font-bold'>
              {initial}
            </span>
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-sm font-semibold tracking-tight text-foreground/90'>
            {props.model.model_name}
          </h3>
          <div className='mt-0.5 flex items-center gap-1.5'>
            {props.model.vendor_name && (
              <span className='text-muted-foreground/60 text-[11px]'>
                {props.model.vendor_name}
              </span>
            )}
            {props.model.vendor_name && tokenUnitLabel && (
              <span className='text-muted-foreground/30 text-[10px]'>•</span>
            )}
            <span className='text-muted-foreground/40 text-[10px]'>
              {tokenUnitLabel}
            </span>
          </div>
        </div>
        <button
          type='button'
          onClick={handleCopy}
          className='text-muted-foreground/40 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg p-1.5 opacity-0 transition-all group-hover:opacity-100'
          title={t('Copy model name')}
        >
          <Copy className='size-3.5' />
        </button>
      </div>

      {/* Price section */}
      <div className='mt-3 flex flex-1 items-start border-t border-gray-200 dark:border-gray-700/60 pt-3'>
        <div className='flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs'>
          {priceSummary}
        </div>
        <span className='text-muted-foreground text-[10px] shrink-0 ml-auto'>
          /{tokenUnitLabel} tokens
        </span>
      </div>

      {/* Footer: tags + details — always at bottom */}
      <div className='mt-auto pt-3 flex items-center justify-between gap-2'>
        <div className='flex min-w-0 flex-wrap items-center gap-1.5'>
          {bottomTags.length > 0 ? (
            bottomTags.map((item) => (
              <span
                key={item}
                className='inline-flex items-center rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] text-emerald-700 dark:bg-emerald-500/5 dark:border-emerald-500/10 dark:text-emerald-300/70'
              >
                {item}
              </span>
            ))
          ) : (
            <ModelBillingModeBadge model={props.model} />
          )}
          {hiddenCount > 0 && (
            <span className='text-muted-foreground/40 text-[10px]'>
              +{hiddenCount}
            </span>
          )}
        </div>
        <button
          type='button'
          onClick={props.onClick}
          className='text-muted-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex shrink-0 items-center gap-0.5 text-[11px] font-medium transition-colors'
        >
          {t('Details')}
          <ChevronRight className='size-3' />
        </button>
      </div>
    </div>
  )
})
