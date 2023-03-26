export default function a11yProps(index: number) {
   return {
      id: `navigation-${index}`,
      'aria-controls': `navigationpanel-${index}`,
   }
}
