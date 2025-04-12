// backend/controllers/culturalController.js
const cultural = [
    { id: 1, title: 'Cultural Events', description: 'Images of recent cultural events around the world.' },
    { id: 2, title: 'Videos', description: 'Videos capturing traditional performances and rituals.' },
  ];
  
  exports.getCultural = (req, res) => {
    res.status(200).json(cultural);
  };
  