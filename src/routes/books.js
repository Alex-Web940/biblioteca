import { Router } from 'express';
import { check } from 'express-validator';
import bookController from '../controllers/bookController.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/',     bookController.getAll);
router.get('/:id',  bookController.getById);

router.post('/', [
    check('titulo', 'El título es obligatorio').not().isEmpty().trim(),
    check('isbn', 'El ISBN es obligatorio').not().isEmpty(),
    check('genero', 'El género no es válido').isIn(['fiction', 'non-fiction', 'sci-fi', 'history', 'other']),
    check('author', 'El autor debe ser un ID válido').isMongoId(),
    validarCampos
], bookController.create);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], bookController.update);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], bookController.remove);

export default router;