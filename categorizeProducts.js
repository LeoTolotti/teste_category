const stringSimilarity = require('string-similarity');

const products = [
  {
    id: 1,
    title: 'Leite Integral Piracanjuba 1L',
    supermarket: 'Supermercado A',
  },
  {
    id: 2,
    title: 'Leite Piracanjuba Integral 1L',
    supermarket: 'Supermercado B',
  },
  { id: 3, title: 'Leite Integral Italac 1L', supermarket: 'Supermercado A' },
  { id: 4, title: 'Leite Italac Integral 1L', supermarket: 'Supermercado C' },
  { id: 5, title: 'Leite Parmalat Integral 1L', supermarket: 'Supermercado D' },
  {
    id: 6,
    title: 'Leite Desnatado Piracanjuba 1L',
    supermarket: 'Supermercado A',
  },
  {
    id: 7,
    title: 'Piracanjuba Leite Desnatado 1L',
    supermarket: 'Supermercado B',
  },
  {
    id: 8,
    title: 'Leite Semi-Desnatado Piracanjuba 1L',
    supermarket: 'Supermercado A',
  },
  {
    id: 9,
    title: 'Leite Piracanjuba Semi Desnatado 1 Litro',
    supermarket: 'Supermercado C',
  },
  { id: 10, title: 'Arroz Branco Tio João 5kg', supermarket: 'Supermercado A' },
  { id: 11, title: 'Arroz Tio João Branco 5kg', supermarket: 'Supermercado B' },
  {
    id: 12,
    title: 'Arroz Tio João Integral 5kg',
    supermarket: 'Supermercado A',
  },
  { id: 13, title: 'Feijão Carioca Camil 1kg', supermarket: 'Supermercado A' },
  {
    id: 14,
    title: 'Feijão Camil Tipo Carioca 1kg',
    supermarket: 'Supermercado C',
  },
  {
    id: 15,
    title: 'Feijao Carioca Camil 1 Quilo',
    supermarket: 'Supermercado D',
  },
];

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
