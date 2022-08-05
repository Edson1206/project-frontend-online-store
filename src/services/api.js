export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if(categoryId) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const data = await response.json();
    return data;
  }
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data;
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  // https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
}

