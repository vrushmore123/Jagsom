// backend/controllers/visualsController.js
const visuals = [
    { id: 1, title: 'Handwritten Letters', description: 'Beautiful handwritten letters from various authors.' },
    { id: 2, title: 'Poems', description: 'A collection of poems written by famous poets.' },
    { id: 3, title: 'Live Concerts', description: 'Watch recorded live concerts from different artists.' },
  ];
  
  // Controller function to handle the response
  exports.getVisuals = (req, res) => {
    res.status(200).json(visuals);
  };
  