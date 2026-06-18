import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'El ISBN es obligatorio'],
        unique: true
    },
    genero: {
        type: String,
        enum: ['fiction', 'non-fiction', 'sci-fi', 'history', 'other'],
        required: [true, 'El género es obligatorio']
    },
    anio: {
        type: Number
    },
    copiasDisponibles: {
        type: Number,
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, 'El autor es obligatorio']
    }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);