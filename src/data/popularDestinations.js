import Image1 from "../assets/travel1.jpg";
import Image2 from "../assets/travel2.jpg";
import Image3 from "../assets/travel3.jpg";

export const popularDestinations = [
  {
    title: "European Adventure",
    startDate: "2025-04-05T00:00:00.000Z",
    endDate: "2025-04-16T00:00:00.000Z",
    image: Image1,
    destinations: [
      {
        name: "Paris",
        country: "France",
        startDate: "2025-04-05T00:00:00.000Z",
        endDate: "2025-04-11T00:00:00.000Z",
        activities: [
          "Visit Eiffel Tower",
          "Louvre Museum Tour",
          "Seine River Cruise",
        ],
        accommodation: {
          name: "Grand Hotel Paris",
          address: "123 Champs-Élysées",
          checkIn: "2025-04-05T00:00:00.000Z",
          checkOut: "2025-04-11T00:00:00.000Z",
        },
      },
    ],
  },
  {
    title: "American National Parks",
    startDate: "2025-05-01T00:00:00.000Z",
    endDate: "2025-05-15T00:00:00.000Z",
    image: Image2,
    destinations: [
      {
        name: "Yosemite National Park",
        country: "United States",
        startDate: "2025-05-01T00:00:00.000Z",
        endDate: "2025-05-15T00:00:00.000Z",
        activities: [
          "Hiking in Yosemite Valley",
          "Visit El Capitan",
          "Yosemite Falls",
        ],
        accommodation: {
          name: "Yosemite Valley Lodge",
          address: "9035 Village Dr, Yosemite Village, CA",
          checkIn: "2025-05-01T00:00:00.000Z",
          checkOut: "2025-05-15T00:00:00.000Z",
        },
      },
    ],
  },
  {
    title: "Japanese Journey",
    startDate: "2025-06-01T00:00:00.000Z",
    endDate: "2025-06-14T00:00:00.000Z",
    image: Image3,
    destinations: [
      {
        name: "Tokyo",
        country: "Japan",
        startDate: "2025-06-01T00:00:00.000Z",
        endDate: "2025-06-14T00:00:00.000Z",
        activities: ["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple"],
        accommodation: {
          name: "Tokyo Bay Hotel",
          address: "1-2-3 Shinjuku, Tokyo",
          checkIn: "2025-06-01T00:00:00.000Z",
          checkOut: "2025-06-14T00:00:00.000Z",
        },
      },
    ],
  },
];
