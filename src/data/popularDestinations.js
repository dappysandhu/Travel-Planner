import Image1 from "../assets/travel1.jpg";
import Image2 from "../assets/travel2.jpg";
import Image3 from "../assets/travel3.jpg";

export const popularDestinations = [
  {
    id: "d1",
    name: "Paris",
    country: "France",
    image: Image1,
    activities: [
      "Visit Eiffel Tower",
      "Louvre Museum Tour",
      "Seine River Cruise",
    ],
    accommodation: {
      name: "Grand Hotel Paris",
      address: "123 Champs-Élysées",
    },
  },
  {
    id: "d2",
    name: "Yosemite National Park",
    country: "United States",
    image: Image2,
    activities: [
      "Hiking in Yosemite Valley",
      "Visit El Capitan",
      "Yosemite Falls",
    ],
    accommodation: {
      name: "Yosemite Valley Lodge",
      address: "9035 Village Dr, Yosemite Village, CA",
    },
  },
  {
    id: "d3",
    name: "Tokyo",
    country: "Japan",
    image: Image3,
    activities: ["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple"],
    accommodation: {
      name: "Tokyo Bay Hotel",
      address: "1-2-3 Shinjuku, Tokyo",
    },
  },
];
