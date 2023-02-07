import { body } from 'express-validator'

export const ValidateRegister = [
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
