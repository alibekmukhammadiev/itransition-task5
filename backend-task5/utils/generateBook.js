const { Faker, en, fr, ru } = require("@faker-js/faker");

// Supported locales
const fakerLocales = {
  en_US: { locale: en, name: "English" },
  fr_FR: { locale: fr, name: "Français" },
  ru_RU: { locale: ru, name: "Русский" },
};

// Generate a realistic-looking ISBN
function generateISBN(fakerInstance) {
  const parts = [
    fakerInstance.number.int({ min: 950, max: 999 }),
    fakerInstance.number.int({ min: 100000, max: 999999 }),
    fakerInstance.number.int({ min: 1000, max: 9999 }),
  ];
  return parts.join("-");
}

// Capitalize each word in a title
function capitalizeTitle(title) {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Main book generator
function generateBooks(
  region = "en_US",
  seed = "2101",
  likes = 3.5,
  reviews = 2.7,
  page = 1
) {
  const localeData = fakerLocales[region] || fakerLocales["en_US"];
  const customFaker = new Faker({
    locale: localeData.locale,
    localeFallback: en,
  });

  // Generate 10 stable books per page
  const books = Array.from({ length: 10 }, (_, i) => {
    const index = (page - 1) * 10 + i + 1;

    // ✅ Seed per book based on index + user seed
    const individualSeed = parseInt(seed) + index;
    customFaker.seed(individualSeed);

    // Determine review count with fractional logic
    const reviewCount =
      (individualSeed % 100) / 100 < reviews % 1
        ? Math.floor(reviews) + 1
        : Math.floor(reviews);

    // Generate fake reviews
    const fakeReviews = Array.from({ length: reviewCount }, () => ({
      user: customFaker.person.firstName(),
      text:
        region === "en_US"
          ? customFaker.company.catchPhrase()
          : customFaker.lorem.sentence(),
    }));

    // Generate title
    const rawTitle =
      region === "en_US"
        ? customFaker.word.words({ count: { min: 2, max: 4 } })
        : customFaker.lorem.words({ min: 2, max: 4 });

    return {
      index,
      isbn: generateISBN(customFaker),
      title: capitalizeTitle(rawTitle),
      authors: [customFaker.person.fullName(), customFaker.person.fullName()],
      publisher: customFaker.company.name(),
      reviews: fakeReviews,
      avgReview: parseFloat(reviews),
      likes: customFaker.number.int({ min: 0, max: likes }),
    };
  });

  return books;
}

module.exports = { generateBooks };
