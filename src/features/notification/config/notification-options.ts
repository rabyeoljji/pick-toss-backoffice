export const NOTIFICATION_TYPE = [
  {
    key: 'GENERAL',
    label: '일반',
  },
  {
    key: 'UPDATE_NEWS',
    label: '업데이트·소식',
  },
  {
    key: 'TODAY_QUIZ',
    label: '오늘의 퀴즈',
  },
  {
    key: 'COLLECTION',
    label: '컬렉션',
  },
  {
    key: 'STAR_REWARD',
    label: '별 지급',
  },
] as { key: Notification.Type; label: string }[]

export const SEARCH_OPTIONS = [
  {
    key: 'TITLE_AND_CONTENT',
    label: '제목 및 내용',
  },
  {
    key: 'TITLE',
    label: '제목',
  },
  {
    key: 'CONTENT',
    label: '내용',
  },
] as {
  key: Notification.Request.SearchedNotificationParams['notification-search-option']
  label: string
}[]

export const NOTIFICATION_TARGET = {
  GENERAL: [
    {
      key: 'ALL',
      label: '전체',
    },
  ],
  UPDATE_NEWS: [
    {
      key: 'ALL',
      label: '전체',
    },
  ],
  TODAY_QUIZ: [
    {
      key: 'ALL',
      label: '전체',
    },
    {
      key: 'QUIZ_INCOMPLETE_STATUS',
      label: '퀴즈 미완료 상태',
    },
    {
      key: 'QUIZ_INCOMPLETE_STATUS_FOUR_DAYS',
      label: '퀴즈 미완료-연속 4일 상태',
    },
  ],
  COLLECTION: [
    {
      key: 'ALL',
      label: '전체',
    },
    {
      key: 'COLLECTION_NOT_GENERATE',
      label: '컬렉션 미등록 상태',
    },
    {
      key: 'IT',
      label: '관심 설정-IT·프로그래밍',
    },
    {
      key: 'LAW',
      label: '관심 설정-법학',
    },
    {
      key: 'BUSINESS_ECONOMY',
      label: '관심 설정-경영·경제',
    },
    {
      key: 'SOCIETY_POLITICS',
      label: '관심 설정-사회·정치',
    },
    {
      key: 'LANGUAGE',
      label: '관심 설정-언어',
    },
    {
      key: 'MEDICINE_PHARMACY',
      label: '관심 설정-의학·약학',
    },
    {
      key: 'ART',
      label: '관심 설정-예술',
    },
    {
      key: 'SCIENCE_ENGINEERING',
      label: '관심 설정-과학·공학',
    },
    {
      key: 'HISTORY_PHILOSOPHY',
      label: '관심 설정-역사·철학',
    },
  ],
  STAR_REWARD: [
    {
      key: 'ALL',
      label: '전체',
    },
    // {
    //   key: 'ALL',
    //   label: '초대를 보낸 사람',
    // },
    // {
    //   key: 'ALL',
    //   label: '초대를 받은 사람',
    // },
  ],
}

type NotificationType = keyof typeof NOTIFICATION_TARGET

// 타입 가드 함수 생성
export const isValidNotificationType = (type: string | null): type is NotificationType => {
  return type !== null && type in NOTIFICATION_TARGET
}

export const REPEAT_DAYS = [
  {
    key: 'MONDAY',
    label: '월',
  },
  {
    key: 'TUESDAY',
    label: '화',
  },
  {
    key: 'WEDNESDAY',
    label: '수',
  },
  {
    key: 'THURSDAY',
    label: '목',
  },
  {
    key: 'FRIDAY',
    label: '금',
  },
  {
    key: 'SATURDAY',
    label: '토',
  },
  {
    key: 'SUNDAY',
    label: '일',
  },
] as {
  key: Notification.Days
  label: string
}[]
