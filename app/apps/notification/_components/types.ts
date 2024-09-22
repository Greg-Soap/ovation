export type NotificationType =
  | 'follow'
  | 'likePost'
  | 'reply'
  | 'comment'
  | 'mention'
  | 'retweet'
  | 'clap'
  | 'likeNft'
  | 'personalNewBadge'
  | 'followerNewBadge'
  | 'personalNewExperience'
  | 'followerExperience'
  | 'featureReminder'
  | 'postReminder'

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
