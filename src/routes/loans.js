import { Router } from 'express';
import { check } from 'express-validator';
import loanController from '../controllers/loanController.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/',     loanController.getAll);
router.get('/:id',  loanController.getById);

router.post('/', [
    check('fechaPrestamo', 'La fecha de préstamo es obligatoria').isISO8601().toDate(),
    check('fechaDevolucionEsperada', 'La fecha de devolución es obligatoria').isISO8601().toDate(),
    check('book', 'El libro debe ser un ID válido').isMongoId(),
    check('reader', 'El lector debe ser un ID válido').isMongoId(),
    validarCampos
], loanController.create);

router.patch('/:id/status', [
    check('id', 'No es un ID válido').isMongoId(),
    check('estado', 'El estado no es válido').isIn(['active', 'returned', 'overdue']),
    validarCampos
], loanController.updateStatus);

export default router;