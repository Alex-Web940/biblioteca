import Loan from '../models/Loan.js';

const loanController = {

    getAll: async (req, res) => {
        try {
            const { status, genre } = req.query;
            const filter = {};
            if (status) filter.estado = status;
            let query = Loan.find(filter)
                .populate({ path: 'book', populate: { path: 'author' } })
                .populate('reader');
            if (genre) {
                // filtro por género del libro después del populate
                const loans = await query;
                const filtered = loans.filter(l => l.book && l.book.genero === genre);
                return res.json({ success: true, data: filtered });
            }
            const loans = await query;
            res.json({ success: true, data: loans });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const loan = await Loan.findById(req.params.id)
                .populate({ path: 'book', populate: { path: 'author' } })
                .populate('reader');
            if (!loan) return res.status(404).json({ success: false, message: 'Préstamo no encontrado' });
            res.json({ success: true, data: loan });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { fechaPrestamo, fechaDevolucionEsperada } = req.body;
            // Validar que fechaDevolucionEsperada > fechaPrestamo
            if (new Date(fechaDevolucionEsperada) <= new Date(fechaPrestamo)) {
                return res.status(400).json({ success: false, message: 'La fecha de devolución debe ser posterior a la de préstamo' });
            }
            const loan = await Loan.create(req.body);
            res.status(201).json({ success: true, data: loan });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { estado } = req.body;
            const loan = await Loan.findByIdAndUpdate(
                req.params.id,
                { estado },
                { new: true, runValidators: true }
            );
            if (!loan) return res.status(404).json({ success: false, message: 'Préstamo no encontrado' });
            res.json({ success: true, data: loan });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
};

export default loanController;