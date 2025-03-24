const Tour = require('../models/tour');

const toursController = {
  // Get all tours
  async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(200).json(tours);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch tours', error: err.message });
    }
  },

  // Get tour by ID
  async getTourById(req, res) {
    try {
      const tour = await Tour.findByPk(req.params.id);
      if (!tour) return res.status(404).json({ message: 'Tour not found' });
      res.status(200).json(tour);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch the tour', error: err.message });
    }
  },

  // Create a new tour (admin only)
  async createTour(req, res) {
    try {
      const newTour = await Tour.create(req.body);
      res.status(201).json(newTour);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create tour', error: err.message });
    }
  },

  // Update a tour (admin only)
  async updateTour(req, res) {
    try {
      const updated = await Tour.update(req.body, { where: { id: req.params.id } });
      if (!updated[0]) return res.status(404).json({ message: 'Tour not found' });
      res.status(200).json({ message: 'Tour updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update tour', error: err.message });
    }
  },

  // Delete a tour (admin only)
  async deleteTour(req, res) {
    try {
      const deleted = await Tour.destroy({ where: { id: req.params.id } });
      if (!deleted) return res.status(404).json({ message: 'Tour not found' });
      res.status(200).json({ message: 'Tour deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete tour', error: err.message });
    }
  },
};

module.exports = toursController;
