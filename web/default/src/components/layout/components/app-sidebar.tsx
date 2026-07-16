/*
 * NovAPI — Console sidebar navigation.
 * Uses a simple aside element (same structure as pricing sidebar).
 */
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { useSidebarView } from '@/hooks/use-sidebar-view'
import { MOTION_TRANSITION, MOTION_VARIANTS } from '@/lib/motion'

import { NavGroup } from './nav-group'
import { SidebarViewHeader } from './sidebar-view-header'

export function AppSidebar() {
  const { key, view, navGroups } = useSidebarView()
  const shouldReduce = useReducedMotion()

  return (
    <aside className='rounded-xl border border-gray-200 dark:border-gray-700 bg-card dark:bg-card/30 p-3 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto'>
      {view && <SidebarViewHeader view={view} />}

      <nav className='py-1'>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={key}
            initial={
              shouldReduce ? false : MOTION_VARIANTS.sidebarSlide.initial
            }
            animate={MOTION_VARIANTS.sidebarSlide.animate}
            exit={shouldReduce ? undefined : MOTION_VARIANTS.sidebarSlide.exit}
            transition={MOTION_TRANSITION.fast}
            className='flex flex-col'
          >
            {navGroups.map((props) => (
              <NavGroup key={props.id || props.title} {...props} />
            ))}
          </motion.div>
        </AnimatePresence>
      </nav>
    </aside>
  )
}
