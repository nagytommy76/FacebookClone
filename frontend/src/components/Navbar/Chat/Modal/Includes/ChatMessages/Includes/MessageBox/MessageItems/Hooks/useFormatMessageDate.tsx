import type { IMessages } from '@/Chat/Types'

// Helper function to format date by the desired interval (minute, hour, day)
function formatDateByInterval(dateStr: string, interval: 'minute' | 'hour' | 'day') {
   const date = new Date(dateStr)
   switch (interval) {
      case 'minute':
         return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
            date.getUTCDate()
         ).padStart(2, '0')}T${String(date.getUTCHours() - date.getTimezoneOffset() / 60).padStart(
            2,
            '0'
         )}:${String(date.getUTCMinutes()).padStart(2, '0')}`
      case 'hour':
         return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
            date.getUTCDate()
         ).padStart(2, '0')}T${String(date.getUTCHours() - date.getTimezoneOffset() / 60).padStart(
            2,
            '0'
         )}:00`
      case 'day':
         return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(
            date.getUTCDate()
         ).padStart(2, '0')}`
      default:
         return dateStr // Default to original timestamp if no valid interval is provided
   }
}

const useFormatMessageDate = () => {
   // Function to group messages by the desired interval
   function groupMessagesByInterval(messages: IMessages[] | null, interval: 'minute' | 'hour' | 'day') {
      if (!messages) return null
      const groupedMessages: { [key: string]: IMessages[] } = {}

      messages.map((singleMessage) => {
         const formattedDate: any = formatDateByInterval(singleMessage.createdAt as string, interval)
         if (!groupedMessages[formattedDate]) {
            groupedMessages[formattedDate] = []
         }

         groupedMessages[formattedDate].push(singleMessage)
      })
      return groupedMessages
   }

   return groupMessagesByInterval
}

export default useFormatMessageDate
