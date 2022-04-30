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
      class="markCheckbox"
      :class="{ markCheckbox_checked: inputChecked }"
    >
      <label class="markCheckbox__label">
        <input
          type="checkbox"
          class="markCheckbox__input"
          :checked="inputChecked"
          :value="valueBaseCheckbox"
          :name="$attrs.name"
          :disabled="$attrs.disabled"
          @change="updateCheckbox"
        /><span class="markCheckbox__mark flex-fixed" :class="{ markCheckbox__mark_checked: inputChecked }"></span><span class="markCheckbox__button flex-content"><slot /></span>
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
export default class markCheckbox extends Vue implements IBaseCheckbox {
  @Model('input', { type: [Boolean, Array] }) readonly checked!: boolean | BaseCheckboxValue[]

  @Prop({ type: [String, Number], default: '' }) readonly value!: BaseCheckboxValue

  @Emit()
  input(value: boolean | BaseCheckboxValue[]): boolean | BaseCheckboxValue[] {
    return value;
  }
};
</script>

<style scoped>
.markCheckbox__mark {
  border-radius: 2px;
  border: 1px solid #9d9d9d;
  background: #fff;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 6px;
}
.markCheckbox__label:hover .markCheckbox__mark:not(.markCheckbox__mark_checked) {
  background: #eeeeee;
}
.markCheckbox__mark_checked {
  position: relative;
  border-color: rgb(152 189 255);
  background: #E5F5FF;
}
.markCheckbox__mark_checked:before {
  content: "";
  width: 10px;
  height: 5px;
  position: absolute;
  top: 3px;
  left: 2px;
  border: 1px solid #161616;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}
.markCheckbox__button {
  display: inline-block;
  border: none;
  font-size: 14px;
  line-height: 1;
}
.markCheckbox__label {
  display: flex;
  position: relative;
  cursor: pointer;
}
.markCheckbox__input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 0;
  height: 0;
  opacity: 0;
}
.markCheckbox__input:focus-visible ~ .markCheckbox__button {
  outline-offset: 2px;
  outline: rgb(16, 16, 16) auto 1px;
}
</style>
