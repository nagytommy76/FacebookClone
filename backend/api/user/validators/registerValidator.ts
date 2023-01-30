import { body, CustomValidator } from 'express-validator'

export const ValidateRegister = [
   body('email').isEmail().normalizeEmail().withMessage('Az email cím nem megfelelő formátumú!'),
   body('sureName').trim().isLength({ min: 1 }).withMessage('A Vezetéknév mező kitöltése kötelező!'),
   body('firstName').trim().isLength({ min: 1 }).withMessage('A Keresztnév mező kitöltése kötelező!'),
   // body('firstPassword').custom(checkPasswordsEquality),
]
