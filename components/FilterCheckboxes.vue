<template>
  <div class="filterCheckboxes">
    <div class="filterCheckboxes__wrap">
      <ButtonCheckbox
        class="filterCheckboxes__item"
        v-for="(control) in controls"
        :key="control.value"
        :value="control.value"
        :checked="value"
        @input="onChangeChecked"
      >{{ control.label }}</ButtonCheckbox>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Model, Prop, Vue} from 'nuxt-property-decorator'
import ButtonCheckbox from "~/components/ButtonCheckbox.vue";
import { IControl } from '~/types/Control';

@Component({
  components: {
    ButtonCheckbox,
  }
})
export default class FilterCheckboxes extends Vue {
  @Model('input', { type: Array, default: () => [] }) readonly value!: string[]

  @Prop({ type: Array, default: () => [] }) readonly controls!: IControl[]

  @Emit()
  input(value: string[]): string[] {
    return value;
  }

  onChangeChecked(selectedCheckboxes: string[]): void {
    this.input([ ...selectedCheckboxes ]);
  }
}
</script>

<style scoped>
.filterCheckboxes {
  background: #fff;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  padding: 6px 10px;
  display: flex;
  overflow: auto;
}
.filterCheckboxes__wrap {
  margin-left: -1px;
  margin-top: -1px;
}
.filterCheckboxes__item {
  margin-left: 1px;
  margin-top: 1px;
  display: inline-block;
}
</style>
