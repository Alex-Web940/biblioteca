import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generarJWT } from '../middlewares/validar-jwt.js';

const authController = {

    register: async (req, res) => {
        const { nombre, email, password } = req.body;
        try {
            const user = new User({ nombre, email, password });
            await user.save(); // el pre-save hook encripta el password
            res.status(201).json({ nombre: user.nombre, email: user.email, rol: user.rol });
        } catch (error) {
            res.status(500).json({ msg: 'Hable con el WebMaster' });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({ msg: 'Usuario / Password no son correctos' });
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ msg: 'Usuario / Password no son correctos' });
            }
            const token = await generarJWT(user.id);
            res.json({ id: user._id, nombre: user.nombre, email: user.email, token });
        } catch (error) {
            res.status(500).json({ msg: 'Hable con el WebMaster' });
        }
    }
};

export default authController;