import { Router } from 'express';
import { check } from 'express-validator';
import authorController from '../controllers/authorController.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/',      authorController.getAll);
router.get('/:id',   authorController.getById);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    validarCampos
], authorController.create);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], authorController.update);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], authorController.remove);

export default router;