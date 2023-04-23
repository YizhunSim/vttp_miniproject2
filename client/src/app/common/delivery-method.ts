export class DeliveryMethod {
  constructor(
    public id: string,
    public shortName: string,
    public description: string,
    public deliveryTime: string,
    public price: number,
  ){}
}
