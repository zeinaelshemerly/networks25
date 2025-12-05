var destinations = [
  // Beaches
  {
    id: "maldives",
    name: "Maldives",
    category: "Beaches",
    description:
      "Crystal-clear water, white-sand beaches, and overwater bungalows perfect for a relaxing escape.",
    videoUrl: "https://www.youtube.com/embed/omrw5vWm0Q0"
  },
  {
    id: "bali",
    name: "Bali",
    category: "Beaches",
    description:
      "Indonesian paradise with beautiful beaches, rice terraces, and a rich culture.",
    videoUrl: "https://www.youtube.com/embed/2W0dK7yqCG8"
  },

  // Mountains
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    category: "Mountains",
    description:
      "Snowy peaks, alpine villages, and some of the best skiing and hiking in Europe.",
    videoUrl: "https://www.youtube.com/embed/7Hc9yJkPRQw"
  },
  {
    id: "nepal-himalayas",
    name: "Himalayas (Nepal)",
    category: "Mountains",
    description:
      "Home of Everest and breathtaking trekking routes with stunning views.",
    videoUrl: "https://www.youtube.com/embed/G19GzC_jV7k"
  },

  // Cities
  {
    id: "paris",
    name: "Paris",
    category: "Cities",
    description:
      "The City of Light, famous for the Eiffel Tower, Louvre, and charming streets.",
    videoUrl: "https://www.youtube.com/embed/yjX2e6UoO5c"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    category: "Cities",
    description:
      "Futuristic city with neon lights, ancient temples, and incredible food.",
    videoUrl: "https://www.youtube.com/embed/wB9KqC6Y1qM"
  },

  // Nature
  {
    id: "amazon",
    name: "Amazon Rainforest",
    category: "Nature",
    description:
      "The largest tropical rainforest in the world, full of biodiversity and adventure.",
    videoUrl: "https://www.youtube.com/embed/tLNoRdyjO2Q"
  },
  {
    id: "safari-kenya",
    name: "Kenya Safari",
    category: "Nature",
    description:
      "Classic African safari experience with lions, elephants, and endless savannas.",
    videoUrl: "https://www.youtube.com/embed/kIZwH0N7LCo"
  }
];

function findDestinationsByCategory(categoryName) {
  return destinations.filter(function (d) {
    return d.category.toLowerCase() === categoryName.toLowerCase();
  });
}

function findDestinationById(id) {
  return destinations.find(function (d) {
    return d.id === id;
  });
}

function searchDestinationsByName(query) {
  var q = query.toLowerCase();
  return destinations.filter(function (d) {
    return d.name.toLowerCase().indexOf(q) !== -1;
  });
}

module.exports = {
  destinations: destinations,
  findDestinationsByCategory: findDestinationsByCategory,
  findDestinationById: findDestinationById,
  searchDestinationsByName: searchDestinationsByName
};
