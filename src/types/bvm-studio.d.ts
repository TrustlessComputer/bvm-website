interface BoxItemPosition {
  id: number;
  order_id: string,
  position_id: string,
  x: number,
  y: number
}

interface IParamsAddDrafting {
  order_id: string,
  meta_data: string
}

interface IDrafting {
  id: number,
  order_id: string,
  meta_data: string
}
