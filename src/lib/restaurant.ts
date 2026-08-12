export const restaurant = {
  name: "Burger Grand",
  tagline: "Big Bites. Grand Flavours.",
  addressLine1: "Shop No 1, Plot No 18, Gulab Bagh",
  addressLine2: "Uttam Nagar, Near Nawada Metro Station, Delhi 110059",
  locality: "Nawada • Uttam Nagar",
  phone: "+917065656537",
  phoneDisplay: "+91 70656 56537",
  whatsapp: "917065656537",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  mapsEmbed:
    "https://www.google.com/maps?q=Gulab%20Bagh%20Uttam%20Nagar%20Nawada%20Metro%20Station%20Delhi&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Gulab+Bagh+Uttam+Nagar+Nawada+Metro+Station+Delhi",
  hours: { openHour: 11, closeHour: 24, label: "11:00 AM — 12:00 AM", days: "Mon — Sun" },
  rating: 4.2,
  reviewCount: 1200,
  deliveryPlatforms: ["Zomato", "Swiggy", "Pickup"],
};

export const INR = (n: number) => `₹${Math.round(n)}`;

/** Local (IST) open/closed status. */
export function isOpenNow(now: Date = new Date()) {
  const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
  const h = ist.getHours() + ist.getMinutes() / 60;
  return h >= restaurant.hours.openHour && h < restaurant.hours.closeHour;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`;
}
