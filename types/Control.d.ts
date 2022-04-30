export interface IControl {
  value: string;
  label: string;
}

export interface IControlWithDescription extends IControl {
  description: string;
}
