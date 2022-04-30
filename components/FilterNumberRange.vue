<template>
  <div class="filterNumberRange">
    <div class="filterNumberRange__wrap">
      <BaseNumberInput :maxlength="maxLength" class="filterNumberRange__input" :placeholder="placeholderFrom" :value="value[0]" @input="onChangeFrom" />
      <span class="filterNumberRange__separator"></span>
      <BaseNumberInput :maxlength="maxLength" class="filterNumberRange__input" :placeholder="placeholderTo" :value="value[1]" @input="onChangeTo"/>
      <div class="filterNumberRange__type" v-if="$slots.default"><div><slot /></div></div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Model, Prop, Vue} from 'nuxt-property-decorator';
import BaseNumberInput from '@/components/BaseNumberInput.vue';
import {RangeFormattedNumber} from "~/types/Range";

@Component({
  components: {BaseNumberInput}
})
export default class FilterNumberRange extends Vue {
  @Model('input', { type: Array, default: () => [] }) readonly value!: RangeFormattedNumber

  @Prop({ type: Number }) readonly maxLength: number | undefined
  @Prop({ type: String, default: '' }) readonly placeholderFrom!: string
  @Prop({ type: String, default: '' }) readonly placeholderTo!: string

  @Emit()
  input(value: RangeFormattedNumber): RangeFormattedNumber {
    return value;
  }

  onChangeFrom(valueFrom: string): void {
    this.input([ valueFrom, this.value[1] ]);
  }

  onChangeTo(valueTo: string): void {
    this.input([ this.value[0], valueTo ]);
  }
}
</script>

<style scoped>
.filterNumberRange {
  border-radius: 4px;

  border: 1px solid rgba(0,0,0,.15);
  height: 40px;
}
.filterNumberRange__wrap {
  margin-top: -1px;
  margin-left: -1px;
  display: flex;
  align-items: stretch;
  height: 40px;
}
.filterNumberRange__separator {
  position: relative;
  width: 30px;
}
.filterNumberRange__separator:before {
  content: '';
  display: block;
  width: 10px;
  height: 2px;
  background: #aaaaaa;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1px;
  margin-left: -5px;
}

.filterNumberRange__input:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.filterNumberRange__input:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.filterNumberRange__input {
  background: transparent;
  border-radius: 0;
  border: 1px solid transparent;
  padding: 5px 10px;
  line-height: 1.5;
  width: 130px;
  height: 100%;
}
.filterNumberRange__input:focus {
  outline: none;
  border: 1px solid #98bdff;
  box-shadow: 0 0 0 3px rgb(152 189 255 / 25%);
  z-index: 3;
}

.filterNumberRange__type {
  border-radius: 0;
  border-left-color: transparent;
  border-right-color: transparent;
  padding: 0.25rem 0.5rem;
  line-height: 1.5;

  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  color: #373737;
  font-size: 14px;
}
.filterNumberRange__type:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-left-color: rgba(0,0,0,.15);
  margin-left: 0;
}
.filterNumberRange__type:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-right-color: rgba(0,0,0,.15);
}

</style>
