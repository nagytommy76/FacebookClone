import { body, CustomValidator } from 'express-validator'

export const ValidateRegister = [
   body('email')
      .isLength({ min: 2 })
      .withMessage('Nem lehet üres amező!')
      .isEmail()
      .normalizeEmail()
      .withMessage('Az email cím nem megfelelő formátumú vagy üres a mező!'),
   body('sureName').trim().isLength({ min: 1 }).withMessage('A Vezetéknév mező kitöltése kötelező!'),
   body('firstName').trim().isLength({ min: 1 }).withMessage('A Keresztnév mező kitöltése kötelező!'),
   // body('firstPassword').custom(checkPasswordsEquality),
]
