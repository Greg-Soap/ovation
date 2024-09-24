export type NotificationType = 'Follow' | 'Badge'

export interface NotificationItem {
  type: NotificationType
  userProfilePicture: string
  notificationTypeImg: string
  userDisplayName: string
  userName: string
  post?: string
  comment?: string
  nftImage?: string
  nftName?: string
}
