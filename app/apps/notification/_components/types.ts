export type NotificationType = 'Follow' | 'Badge'

export interface NotificationItem {
  id: number
  initiator?: null
  isFollowing: boolean
  message: string
  reference: NotificationType
  referenceId: string
  title: string
  
}
