<template>
  <BaseCheckbox
    :checked="checked"
    :value="value"
    @input="input"

    v-slot="{
      inputChecked,
      value: valueBaseCheckbox,
      updateCheckbox,
    }"
  >
    <div
      class="buttonCheckbox"
      :class="{ buttonCheckbox_checked: inputChecked }"
    >
      <label class="buttonCheckbox__label">
        <input
          type="checkbox"
          class="buttonCheckbox__input"
          :checked="inputChecked"
          :value="valueBaseCheckbox"
          :name="$attrs.name"
          :disabled="$attrs.disabled"
          @change="updateCheckbox"
        /><span class="buttonCheckbox__button" :class="{buttonCheckbox__button_active: inputChecked}"><slot /></span>
      </label>
    </div>
  </BaseCheckbox>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from 'nuxt-property-decorator';
import BaseCheckbox from "~/components/BaseCheckbox.vue";
import {BaseCheckboxValue, IBaseCheckbox} from "~/types/Checkbox";
@Component({
  components: {BaseCheckbox}
})
export default class ButtonCheckbox extends Vue implements IBaseCheckbox {
  @Model('input', { type: [Boolean, Array] }) readonly checked!: boolean | BaseCheckboxValue[]

  @Prop({ type: [String, Number], default: '' }) readonly value!: BaseCheckboxValue

  @Emit()
  input(value: boolean | BaseCheckboxValue[]): boolean | BaseCheckboxValue[] {
    return value;
  }
};
</script>

<style scoped>
.buttonCheckbox__button {
  display: inline-block;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  padding: 6px 9px;
  line-height: 1;
  color: #1e1e1e;
  cursor: pointer;
}
.buttonCheckbox__button:hover:not(.buttonCheckbox__button_active) {
  background: #eee;
}
.buttonCheckbox__button_active {
  background: #dfebff;
  color: #000;
}
.buttonCheckbox__label {
  display: inline-block;
  position: relative;
}
.buttonCheckbox__input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 0;
  height: 0;
  opacity: 0;
}
.buttonCheckbox__input:focus-visible ~ .buttonCheckbox__button {
  outline-offset: 2px;
  outline: rgb(16, 16, 16) auto 1px;
}
</style>
