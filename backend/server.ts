import app from './app'
import './config/endpoints.config'

app.start(process.env.PORT || 5050).catch((error) => {
   console.error('Error starting server:', error)
})
