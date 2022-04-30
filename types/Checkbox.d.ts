export type BaseCheckboxValue = string | number;

export interface IBaseCheckbox {
  checked: boolean | BaseCheckboxValue[];
  value: BaseCheckboxValue;
  input: (value: boolean | BaseCheckboxValue[]) => boolean | BaseCheckboxValue[];
}
