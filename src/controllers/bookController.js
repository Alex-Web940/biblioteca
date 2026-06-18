import Book from '../models/Book.js';

const bookController = {

    getAll: async (req, res) => {
        try {
            const { genre, authorId } = req.query;
            const filter = {};
            if (genre)    filter.genero = genre;
            if (authorId) filter.author = authorId;
            const books = await Book.find(filter).populate('author');
            res.json({ success: true, data: books });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id).populate('author');
            if (!book) return res.status(404).json({ success: false, message: 'Libro no encontrado' });
            res.json({ success: true, data: book });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const book = await Book.create(req.body);
            res.status(201).json({ success: true, data: book });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!book) return res.status(404).json({ success: false, message: 'Libro no encontrado' });
            res.json({ success: true, data: book });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            if (!book) return res.status(404).json({ success: false, message: 'Libro no encontrado' });
            res.json({ success: true, message: 'Libro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default bookController;