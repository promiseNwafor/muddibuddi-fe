import { useState } from 'react'
import { LuChevronsUpDown } from 'react-icons/lu'
import { RxExit } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

import { sideBarItems } from '@/constants'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LogoutButton } from '../auth/LogoutButton'

const SidebarContainer = () => {
  const [sheetOpen, setSheetOpen] = useState(false)

  const toggleSheet = () => setSheetOpen((prevSheet) => !prevSheet)

  const sideMenuItems = ({
    smallScreen = false,
  }: {
    smallScreen?: boolean
  }) => (
    <div className="flex flex-col gap-4">
      {sideBarItems.map((item) => {
        return (
          <NavLink
            key={item.displayName}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 p-4 py-3 text-sm text-primary font-medium rounded-lg hover:bg-secondary',
                isActive && 'bg-secondary text-primary',
              )
            }
            onClick={() => (smallScreen ? toggleSheet() : null)}
          >
            <item.Icon size={20} />
            <span>{item.displayName}</span>
          </NavLink>
        )
      })}
    </div>
  )

  return (
    <>
      <aside className="bg-background text-white lg:fixed top-0 bottom-0">
        <div className="absolute left-0 h-20 p-4 flex items-center lg:hidden">
          <Sheet onOpenChange={toggleSheet} open={sheetOpen}>
            <SheetTrigger>
              <HiOutlineMenuAlt1 size={30} className="mb-2" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <div className="h-12">
                    <NavLink to="/">MoodiBuddi</NavLink>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  {sideMenuItems({ smallScreen: true })}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="w-60 h-screen hidden lg:block">
          <div className="h-20 p-7 center justify-start">
            <NavLink to="/" className="text-xl">
              MoodiBuddi
            </NavLink>
          </div>
          <hr className="border-white/25 my-4" />

          <div className="p-4">{sideMenuItems({ smallScreen: false })}</div>
          <div className="center">
            <div className="absolute bottom-5 w-52 p-3 bg-white text-accent rounded-lg shadow-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-start">
                  <p className="text-sm font-medium">MoodiBuddi</p>
                  <p className="text-xs truncate w-32">amy@email.com</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between outline-none">
                  <>
                    <div className="w-4 p-0">
                      <LuChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </div>
                  </>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                  <LogoutButton>
                    <DropdownMenuItem>
                      <RxExit className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </LogoutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SidebarContainer
