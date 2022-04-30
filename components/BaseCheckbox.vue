<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from 'nuxt-property-decorator';
import {BaseCheckboxValue, IBaseCheckbox} from "~/types/Checkbox";

@Component
export default class BaseCheckbox extends Vue implements IBaseCheckbox {
  render() {
    return this.$scopedSlots.default!({
      inputChecked: this.inputChecked,
      updateCheckbox: this.updateCheckbox,
      value: this.value,
    }) as any;
  }

  @Model('input', { type: [Boolean, Array] }) readonly checked!: boolean | BaseCheckboxValue[]

  @Prop({ type: [String, Number], default: '' }) readonly value!: BaseCheckboxValue

  @Emit()
  checking(value: BaseCheckboxValue): BaseCheckboxValue {
    return value;
  }

  @Emit()
  unchecking(value: BaseCheckboxValue): BaseCheckboxValue {
    return value;
  }

  @Emit()
  change(e: Event): Event {
    return e;
  }

  @Emit()
  input(value: boolean | BaseCheckboxValue[]): boolean | BaseCheckboxValue[] {
    return value;
  }

  get inputChecked(): boolean {
    return Array.isArray(this.checked) ? this.checked.map(value => String(value)).includes(String(this.value)) : this.checked;
  }

  updateCheckbox(e: Event): void {
    this.change(e);
    const inputElement: HTMLInputElement = e?.target as HTMLInputElement;
    let isChecked: boolean | BaseCheckboxValue[] = Boolean(inputElement?.checked);
    if (Array.isArray(this.checked)) {
      isChecked = this.changeCheckedList([ ...this.checked ], this.value, isChecked);
    }
    this.input(isChecked);
  }

  changeCheckedList(checkboxes: BaseCheckboxValue[], value: BaseCheckboxValue, isChecked: boolean): BaseCheckboxValue[] {
    const checkboxIndex = checkboxes.findIndex((checkbox: BaseCheckboxValue) => {
      return checkbox === value;
    });
    if (isChecked) {
      if (checkboxIndex === -1) {
        checkboxes.push(value);
      }
    } else if (checkboxIndex >= 0) {
      checkboxes.splice(checkboxIndex, 1);
    }
    return checkboxes;
  }
};
</script>
