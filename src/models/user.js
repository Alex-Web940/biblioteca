import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
        select: false   // nunca se retorna en respuestas
    },
    rol: {
        type: String,
        enum: ['admin', 'librarian'],
        default: 'librarian'
    }
}, { timestamps: true });

// Pre-save hook: encripta el password antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

export default mongoose.model('User', userSchema);