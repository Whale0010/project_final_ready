export type EventType = {
  _id: string
  title: string
  description?: string
  startDate?: string
  registrations?: Array<unknown>
  [key: string]: unknown
}

export type DeepSeekResponse = {
  answer?: string
  text?: string
  data?: unknown
}
