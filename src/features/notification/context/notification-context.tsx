'use client'

import { createContext, useContext, ReactNode, useMemo, useState } from 'react'

interface NotificationContextType {
  openSettingModal: boolean
  setOpenSettingModal: (value: boolean) => void
  filterState: Filter
  setType: (type: Filter['type']) => void
  setStatus: (status: { on: boolean; off: boolean }) => void
  setOption: (keywordTarget: Filter['option']) => void
  setKeyword: (keyword: Filter['keyword']) => void
  reset: () => void
}

// TODO: type, status 타입 수정
interface Filter {
  type: Notification.Type | null
  status: { on: boolean; off: boolean }
  option: Notification.Request.SearchedNotificationParams['notification-search-option']
  keyword: string | null
}

const initialFilter = {
  type: null,
  status: { on: true, off: true },
  option: 'TITLE_AND_CONTENT' as Filter['option'],
  keyword: null,
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [openSettingModal, setOpenSettingModal] = useState(false)
  const [filterState, setFilterState] = useState<Filter>(initialFilter)

  const values = useMemo(
    () => ({
      openSettingModal,
      setOpenSettingModal,
      filterState,
      setType: (type: Filter['type']) => {
        setFilterState((prev) => ({
          ...prev,
          type,
        }))
      },
      setStatus: (status: { on: boolean; off: boolean }) => {
        setFilterState((prev) => ({
          ...prev,
          status: status,
        }))
      },
      setOption: (searchOption: Filter['option']) => {
        setFilterState((prev) => ({
          ...prev,
          option: searchOption,
        }))
      },
      setKeyword: (keyword: Filter['keyword']) => {
        setFilterState((prev) => ({
          ...prev,
          keyword,
        }))
      },
      reset: () => {
        setFilterState(initialFilter)
      },
    }),
    [openSettingModal, setOpenSettingModal, filterState, setFilterState],
  )

  return <NotificationContext.Provider value={values}>{children}</NotificationContext.Provider>
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('NotificationProvider 내에서 사용해주세요')
  }
  return context
}
