export interface SearchOptions {
  type: Notification.Request.SearchedNotificationParams['notification-type'] | null
  isActive: boolean | null
  option: Notification.Request.SearchedNotificationParams['notification-search-option'] | null
  keyword: string | null
  page: string | null
}

export const makeRequestSearchParams = ({
  type,
  isActive,
  option,
  keyword,
  page,
}: SearchOptions) => {
  let params = {
    'notification-search-option': 'TITLE_AND_CONTENT',
  } as Notification.Request.SearchedNotificationParams

  if (type !== null) {
    params = { ...params, 'notification-type': type }
  }

  if (isActive !== null) {
    params = { ...params, 'is-active': isActive }
  }

  if (option !== null) {
    params = { ...params, 'notification-search-option': option }
  }

  if (keyword !== null) {
    params = { ...params, keyword: keyword }
  }

  if (page !== null) {
    params = { ...params, page: Number(page) - 1 }
  }

  return params
}
