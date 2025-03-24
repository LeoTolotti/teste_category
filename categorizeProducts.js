const stringSimilarity = require('string-similarity');
const products = require('./data01.json');

function normalizeTitle(title) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\b(litro|litros|quilo|quilos)\b/g, (match) =>
      match.startsWith('l') ? 'l' : 'kg',
    )
    .replace(/\b(tipo|de)\b/g, '')
    .replace(/\bsemi[-\s]?desnatado\b/g, 'semi-desnatado')
    .replace(/(\d)\s+(?=(l|kg|g|ml))\b/g, '$1$2')
    .split(' ')
    .sort()
    .join(' ');
}

function categorizeProducts(products) {
  const categories = new Map();

  products.forEach(({ title, supermarket }) => {
    const normalizedTitle = normalizeTitle(title);
    let foundCategory = null;

    for (const [key, category] of categories) {
      const similarity = stringSimilarity.compareTwoStrings(
        key,
        normalizedTitle,
      );
      if (similarity > 0.85) {
        foundCategory = category;
        break;
      }
    }

    if (foundCategory) {
      foundCategory.count++;
      foundCategory.products.push({ title, supermarket });
    } else {
      categories.set(normalizedTitle, {
        category: title,
        count: 1,
        products: [{ title, supermarket }],
      });
    }
  });

  return Array.from(categories.values());
}

console.log(JSON.stringify(categorizeProducts(products), null, 2));
