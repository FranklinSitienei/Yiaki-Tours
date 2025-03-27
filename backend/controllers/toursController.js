const Tour = require('../models/tour');
const TourLike = require('../models/like');
const TourBookmark = require('../models/bookmark');
const TourRating = require('../models/rating');

const toursController = {
  // Get all tours
  async getAllTours(req, res) {
    try {
      const tours = await Tour.findAll();
      res.status(200).json(tours);
    } catch (err) {
      console.error('Error fetching tours:', err);
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

  // Booking a tour
  async bookTour(req, res) {
    const { id } = req.params;
    try {
      const tour = await Tour.findByPk(id);
      if (!tour) return res.status(404).json({ message: 'Tour not found' });

      // You might save booking info here to a new Booking model
      res.status(200).json({ message: 'Tour booked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to book tour', error: err.message });
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

  // Like or Unlike
  async likeTour(req, res) {
    try {
      const userId = req.user.id;
      const { id: tourId } = req.params;

      const existing = await TourLike.findOne({ where: { userId, tourId } });
      if (existing) {
        await existing.destroy();
        return res.json({ message: "Unliked tour" });
      }

      await TourLike.create({ userId, tourId });
      res.json({ message: "Liked tour" });
    } catch (err) {
      res.status(500).json({ message: "Error toggling like", error: err.message });
    }
  },

  // Bookmark or Unbookmark
  async bookmarkTour(req, res) {
    try {
      const userId = req.user.id;
      const { id: tourId } = req.params;

      const existing = await TourBookmark.findOne({ where: { userId, tourId } });
      if (existing) {
        await existing.destroy();
        return res.json({ message: "Bookmark removed" });
      }

      await TourBookmark.create({ userId, tourId });
      res.json({ message: "Tour bookmarked" });
    } catch (err) {
      res.status(500).json({ message: "Error toggling bookmark", error: err.message });
    }
  },

  // Rate Tour
  async rateTour(req, res) {
    try {
      const userId = req.user.id;
      const { id: tourId } = req.params;
      const { rating } = req.body;

      const [tourRating, created] = await TourRating.upsert({
        userId,
        tourId,
        rating,
      });

      res.json({ message: "Rating saved" });
    } catch (err) {
      res.status(500).json({ message: "Error rating tour", error: err.message });
    }
  },

  // Remove rating
  async unrateTour(req, res) {
    try {
      const userId = req.user.id;
      const { id: tourId } = req.params;

      await TourRating.destroy({ where: { userId, tourId } });

      res.json({ message: "Rating removed" });
    } catch (err) {
      res.status(500).json({ message: "Error removing rating", error: err.message });
    }
  },
};

module.exports = toursController;
