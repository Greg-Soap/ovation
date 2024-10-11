export type NotificationType = 'Follow' | 'Badge'

export interface NotificationItem {
  id: number
  initiator?: {
    displayName: string
    username: string
    profileImage: string
    initiatorId: string
  }
  isFollowing: boolean
  message: string
  reference: NotificationType
  referenceId: string
  title: string
}
