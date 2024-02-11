import { body } from 'express-validator'
import { User } from '../../../models/user/user'

export const ValidateRegister = [
   body('sureName').trim().isLength({ min: 1 }).withMessage('A Vezetéknév mező kitöltése kötelező!'),
   body('firstName').trim().isLength({ min: 1 }).withMessage('A Keresztnév mező kitöltése kötelező!'),
   body('email').custom(async (email: string) => {
      const checkUserRegisteredWithEmail = await User.findOne({ email })
      if (email.length <= 3) {
         throw new Error('Az email mező kitöltése kötelező!')
      } else if (checkUserRegisteredWithEmail !== null) {
         throw new Error('Ezzel az email címmel már regisztráltak!')
      }
      return true
   }),
   body('password').trim().isLength({ min: 3 }).withMessage('A jelszónak min 3 karakternek kell lennie!'),
   body('dateOfBirth').custom((value: { day: number | ''; month: number | ''; year: number | '' }) => {
      if (value.day === '' || value.month === '' || value.year === '') {
         throw new Error('Kérlek töltsd ki a születési időt!')
      }
      return true
   }),
]

export const ValidateLogin = [
   body('email')
      .custom(async (email: string) => {
         const checkUserRegisteredWithEmail = await User.findOne({ email })
         if (email.length <= 3) {
            throw new Error('Az email mező kitöltése kötelező!')
         } else if (checkUserRegisteredWithEmail === null) {
            throw new Error('Ez az email cím még nincs regisztrálva!')
         }
         return true
      })
      .normalizeEmail()
      .isEmail()
      .withMessage('Az email cím nem megfelelő formátumú!'),
   body('password').trim().isLength({ min: 3 }).withMessage('A jelszónak min 3 karakternek kell lennie!'),
]
