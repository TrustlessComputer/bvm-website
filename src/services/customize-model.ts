export async function getModelCategories(): Promise<IModelCategory[] | null> {

  try {
    const data = await fetch('https://l2aas-api.newbitcoincity.com/api/order/available-list-v3').then(res => res.json());
    return data.result;
  } catch (error) {
    console.error(error);
  }
  return null;
}
