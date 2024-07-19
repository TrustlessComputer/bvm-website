export async function getModelCategories(
  tcAddress: string | undefined,
): Promise<IModelCategory[] | null> {
  try {
    const data = await fetch(
      `https://l2aas-api.newbitcoincity.com/api/order/available-list-v3?tcAddress=${
        tcAddress || ''
      }`,
    ).then((res) => res.json());

    return data.result;
  } catch (error) {
    console.error(error);
  }
  return null;
}

export async function getTemplates(): Promise<Array<IModelCategory[]> | null> {
  try {
    const data = await fetch(
      'https://l2aas-api.newbitcoincity.com/api/order/available-list-template',
    ).then((res) => res.json());

    return data.result;
  } catch (err) {
    console.error(err);
  }

  return null;
}

export async function getTemplateV2(): Promise<ITemplate[] | null> {
  try {
    const data = await fetch(
      'https://l2aas-api.newbitcoincity.com/api/order/available-list-template-v2',
    ).then((res) => res.json());

    return data.result;
  } catch (err) {
    console.error(err);
  }

  return null;
}
