import { body } from 'express-validator'
import { User } from '../../../models/user/user'

const customEmailValidator = async (email: string, isForLogin: boolean = false) => {
   const checkUserRegisteredWithEmail = await User.findOne({ email })
   if (!isForLogin && checkUserRegisteredWithEmail !== null)
      throw new Error('Ezzel az email címmel már regisztráltak!')
   if (isForLogin && checkUserRegisteredWithEmail === null)
      throw new Error('Ez az email cím még nincs regisztrálva!')
   return true
}

export const ValidateRegister = [
   body('email').custom((email: string) => customEmailValidator(email)),
   body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Az email cím nem megfelelő formátumú vagy üres a mező!'),
   body('sureName').trim().isLength({ min: 1 }).withMessage('A Vezetéknév mező kitöltése kötelező!'),
   body('firstName').trim().isLength({ min: 1 }).withMessage('A Keresztnév mező kitöltése kötelező!'),
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
      .isEmail()
      .custom((email: string) => customEmailValidator(email, true)),
   body('password').trim().isLength({ min: 3 }).withMessage('A jelszónak min 3 karakternek kell lennie!'),
]
