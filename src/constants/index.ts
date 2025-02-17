import { RxDashboard } from 'react-icons/rx'
import { PiUsersThreeBold } from 'react-icons/pi'
import { TbReceipt } from 'react-icons/tb'
import { IoSettingsOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'

type ISideBarItems = {
  displayName: string
  path: string
  Icon: IconType
}

export const sideBarItems: ISideBarItems[] = [
  {
    displayName: 'Dashboard',
    path: '/dashboard',
    Icon: RxDashboard,
  },
  {
    displayName: 'Add Entry',
    path: '/add-entry',
    Icon: PiUsersThreeBold,
  },
  {
    displayName: 'Analytics',
    path: '/analytics',
    Icon: TbReceipt,
  },
  {
    displayName: 'Settings',
    path: '/settings',
    Icon: IoSettingsOutline,
  },
]
