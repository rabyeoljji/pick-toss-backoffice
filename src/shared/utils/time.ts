export interface TimeInputWithMeridiem {
  meridiem: '오전' | '오후'
  hour: number
  minutes: number
}

export const convertToISOString = ({ meridiem, hour, minutes }: TimeInputWithMeridiem) => {
  const now = new Date()

  // 12시간제 -> 24시간제 변환
  const hour24 =
    meridiem === '오후' && hour !== 12 ? hour + 12 : meridiem === '오전' && hour === 12 ? 0 : hour

  // 현재 날짜에 시간 설정
  const date = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour24,
      minutes,
      0, // seconds
    ),
  )

  return date.toISOString()
}

export const convertToTimeObject = (isoTimeString: string): TimeInputWithMeridiem => {
  if (!isoTimeString) {
    return {
      meridiem: '오전',
      hour: 0,
      minutes: 0,
    }
  }

  // ISO 문자열에서 Date 객체 생성
  const date = new Date(isoTimeString)

  // 시간과 분 가져오기
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // 오전/오후 결정
  const meridiem = hours < 12 ? '오전' : '오후'

  // 12시간제로 변환
  hours = hours % 12
  // 0시는 12시로 표시
  hours = hours === 0 ? 12 : hours

  return {
    meridiem,
    hour: hours,
    minutes,
  }
}

export const convertToFormattedTime = (isoTimeString: string): string => {
  // ISO 문자열에서 Date 객체 생성
  const date = new Date(isoTimeString)

  // 시간과 분 가져오기
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // 오전/오후 결정
  const period = hours < 12 ? '오전' : '오후'

  // 12시간제로 변환
  hours = hours % 12
  // 0시는 12시로 표시
  hours = hours === 0 ? 12 : hours

  // 시간과 분을 두 자리 숫자로 포맷팅
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  // 최종 문자열 반환
  return `${formattedHours}:${formattedMinutes} ${period}`
}

export const formatRepeatDays = (days: string[]): string => {
  if (days.length === 7) return '매일'

  return `주${days.length}회`
}
