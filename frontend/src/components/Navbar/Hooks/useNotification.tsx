const useNotification = () => {
   return (message: string, profileImage: string, fullName: string) =>
      Notification.requestPermission().then((permission) => {
         if (permission === 'granted') {
            new Notification(`${fullName} üzenetet küldött neked!`, {
               body: message,
               icon: profileImage || '',
            })
         }
      })
}

export default useNotification
