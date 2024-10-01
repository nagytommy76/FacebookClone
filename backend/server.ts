import app from './app'
import './config/endpoints.config'

app.start(5050).catch((error) => {
   console.error('Error starting server:', error)
})
