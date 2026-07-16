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
import { AnimatedOutlet } from '@/components/page-transition'
import { Search } from '@/components/search'
import { SidebarProvider } from '@/components/ui/sidebar'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'

import { AppSidebar } from './app-sidebar'
import { PublicHeader } from './public-header'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout(props: AuthenticatedLayoutProps) {
  return (
    <LayoutProvider>
      <SearchProvider>
        <SidebarProvider defaultOpen>
          <PublicHeader rightContent={<Search />} />
          <div className='mx-auto w-full max-w-[1800px] px-3 pt-20 pb-8 sm:px-6 xl:px-8'>
            <div className='grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]'>
              <div className='sticky top-20 h-fit'>
                <AppSidebar />
              </div>
              <main className='@container/content min-w-0 rounded-xl border border-gray-200 dark:border-gray-700 bg-card dark:bg-card/30 p-4 sm:p-6'>
                {props.children ?? <AnimatedOutlet />}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </SearchProvider>
    </LayoutProvider>
  )
}
