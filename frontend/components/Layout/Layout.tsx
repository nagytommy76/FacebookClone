import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout: React.FC<{ children: React.ReactNode; className: string }> = ({ children, className }) => {
   return (
      <main className={className}>
         <Navbar />
         {children}
         <Footer />
      </main>
   )
}

export default Layout
