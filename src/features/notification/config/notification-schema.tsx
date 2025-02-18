'use client'

import { z } from 'zod'

const initialDays = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as Notification.Days[]

export const initialNotification = {
  type: 'GENERAL' as Notification.Type,
  target: 'ALL' as Notification.Target,
  title: '',
  content: '',
  time: '',
  repeat: initialDays,
  memo: '',
  isActive: true,
}

const notificationTypeSchema = z.enum([
  'GENERAL',
  'TODAY_QUIZ',
  'COLLECTION',
  'STAR_REWARD',
  'UPDATE_NEWS',
])
const notificationTargetSchema = z.enum([
  'ALL',
  'QUIZ_INCOMPLETE_STATUS',
  'QUIZ_INCOMPLETE_STATUS_FOUR_DAYS',
  'COLLECTION_NOT_GENERATE',
  'IT',
  'LAW',
  'BUSINESS_ECONOMY',
  'SOCIETY_POLITICS',
  'LANGUAGE',
  'MEDICINE_PHARMACY',
  'ART',
  'SCIENCE_ENGINEERING',
  'HISTORY_PHILOSOPHY',
])
const daysSchema = z.enum([
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
])

export const notificationSchema = z.object({
  type: notificationTypeSchema,
  target: notificationTargetSchema,
  title: z.string().min(1, '제목을 입력해주세요').max(20, '제목은 최대 20자까지 입력 가능합니다'),
  content: z.string().min(1, '내용을 입력해주세요').max(50, '내용은 최대 50자까지 입력 가능합니다'),
  time: z.string().min(1, '발송 시간을 선택해주세요'),
  repeat: z.array(daysSchema).min(1, '최소 하나의 요일을 선택해주세요'),
  memo: z.string().max(50, '메모는 최대 50자까지 입력 가능합니다').optional(),
  isActive: z.boolean(),
})

export type NotificationFormValues = z.infer<typeof notificationSchema>
