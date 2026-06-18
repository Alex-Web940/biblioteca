import { Router } from 'express';
import { check } from 'express-validator';
import readerController from '../controllers/readerController.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/',     readerController.getAll);
router.get('/:id',  readerController.getById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('email', 'El email no es válido').isEmail().normalizeEmail(),
    check('membresia', 'La membresía no es válida').optional().isIn(['standard', 'premium']),
    validarCampos
], readerController.create);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], readerController.update);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], readerController.remove);

export default router;