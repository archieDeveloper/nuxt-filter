<template>
  <BaseToggle v-model="isOpen" v-slot="{ toggle, close }">
    <div :id="id" class="filterDropdownCheckboxes" v-click-outside="() => { clickOutside(close) }">
      <div
        class="filterDropdownCheckboxes__input"
        :class="{ filterDropdownCheckboxes__input_open: isOpen }"
        @click.stop.prevent="toggle"
        @keydown="keyboardToggle($event, toggle)"
        aria-haspopup="true"
        :aria-expanded="isOpen ? 'true' : 'false'"
        role="button"
        aria-disabled="false"
        tabindex="0"
        :id="dropdownId"
      >
        <template v-if="isEmptyValue">{{ placeholder }}</template>
        <div class="filterDropdownCheckboxes__tag" v-else>
          <span>{{ firstSelectedControlLabel }}</span><span><template v-if="countSelected >= 2">... ({{ countSelected }})</template></span>
          <div class="filterDropdownCheckboxes__tagRemove" @click="clear"></div>
        </div>
        <span
          class="filterDropdownCheckboxes__mark"
          :class="{ filterDropdownCheckboxes__mark_open: isOpen }"
        ></span>
      </div>
      <ul
        v-if="isOpen"
        class="filterDropdownCheckboxes__dropdown"
        role="menu"
        tabindex="-1"
        :aria-labelledby="dropdownId"
      >
        <li
          role="presentation"
          class="filterDropdownCheckboxes__item"
          v-for="(control) in controls"
          :key="control.value"
        >
          <MarkCheckbox
            role="menuitemcheckbox"
            :value="control.value"
            :checked="value"
            @input="onChangeChecked"
          >
            <span class="filterDropdownCheckboxes__label">{{ control.label }}</span>
            <span class="filterDropdownCheckboxes__description">{{ control.description }}</span>
          </MarkCheckbox>
        </li>
        <li class="filterDropdownCheckboxes__item">
          <button class="button" role="menuitem" type="button" @click="clear(close)">Очистить</button>
        </li>
      </ul>
    </div>
  </BaseToggle>
</template>

<script lang="ts">
import {Component, Emit, Model, Prop, Vue} from 'nuxt-property-decorator'
import {IControlWithDescription} from '~/types/Control';
import MarkCheckbox from "~/components/MarkCheckbox.vue";
import BaseToggle from "~/components/BaseToggle.vue";
import { CODE_ENTER, CODE_SPACE, CODE_DOWN } from "~/constants/key-codes";

@Component({
  components: {
    BaseToggle,
    MarkCheckbox,
  }
})
export default class filterDropdownCheckboxes extends Vue {
  isOpen: boolean = false

  @Model('input', { type: Array, default: () => [] }) readonly value!: string[]

  @Prop({ type: Array, default: () => [] }) readonly controls!: IControlWithDescription[]
  @Prop({ type: String, default: '' }) readonly placeholder!: string
  @Prop({ type: String }) readonly id: string | undefined

  get isEmptyValue(): boolean {
    return this.countSelected === 0;
  }

  get countSelected(): number {
    return Number(this.value?.length) || 0;
  }

  get firstSelectedControlLabel(): string {
    if (!this.isEmptyValue) {
      if (Array.isArray(this.value) && Array.isArray(this.controls)) {
        const firstSelectedControl: IControlWithDescription | undefined = this.controls.find(control => {
          return this.value.includes(control.value);
        });
        return firstSelectedControl?.label || '';
      }
    }
    return '';
  }

  get dropdownId(): string | undefined {
    if (this.id) {
      return `${this.id}_dropdown`;
    }
    return undefined;
  }

  @Emit()
  input(value: string[]): string[] {
    return value;
  }

  clickOutside(close: () => void): void {
    if (this.isOpen && typeof close === "function") {
      close();
    }
  }

  onChangeChecked(selectedCheckboxes: string[]): void {
    this.input([ ...selectedCheckboxes ]);
  }

  clear(close: () => void) {
    if (typeof close === "function") {
      close();
    }
    this.input([]);
  }

  keyboardToggle(event: KeyboardEvent, toggle: () => void): void {
    event = event || {}
    const { type, keyCode } = event
    if (type === 'keydown' && [CODE_ENTER, CODE_SPACE, CODE_DOWN].includes(keyCode) && typeof toggle === "function") {
      toggle();
    }
  }
}
</script>

<style scoped>
.filterDropdownCheckboxes {
  position: relative;
}

.filterDropdownCheckboxes__tag {
  background: #dfebff;
  color: #000;
  border-radius: 4px;
  padding: 4px 20px 3px 8px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
  font-size: 14px;
  position: relative;
}

.filterDropdownCheckboxes__tagRemove {
  position: absolute;
  display: block;
  width: 18px;
  height: 21px;
  top: 0;
  right: 0;
  z-index: 3;
  cursor: pointer;
}
.filterDropdownCheckboxes__tagRemove:before,
.filterDropdownCheckboxes__tagRemove:after {
  content: "";
  width: 10px;
  height: 0;
  position: absolute;
  top: 10px;
  left: 3px;
  border-top: 1px solid #333;
}

.filterDropdownCheckboxes__tagRemove:before {
  transform: rotate(-45deg);
}
.filterDropdownCheckboxes__tagRemove:after {
  transform: rotate(45deg);
}

.filterDropdownCheckboxes__input {
  background: #fff;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  padding: 6px 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}
.filterDropdownCheckboxes__input_open {
  background: #f5f4f0;
}
.filterDropdownCheckboxes__mark {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 10px;
}
.filterDropdownCheckboxes__mark:before {
  content: "";
  width: 7px;
  height: 7px;
  position: absolute;
  top: 0;
  left: 1px;
  border: 1px solid #333;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}
.filterDropdownCheckboxes__mark_open:before {
  transform: rotate(135deg);
  top: 4px;
}

.filterDropdownCheckboxes__dropdown {
  position: absolute;
  top: 100%;
  min-width: 350px;
  border-radius: 4px;
  box-shadow: 0 2px 0 3px rgb(152 189 255 / 25%);
  padding: 16px 0;
  display: block;
  background: #fff;

  border: 1px solid #98bdff;
  outline: 0;
  z-index: 3;
  margin: 0;
  list-style-type: none;
}
.filterDropdownCheckboxes__item {
  padding: 0 15px 15px 15px;
  display: block;
}
.filterDropdownCheckboxes__item:last-child {
  padding-bottom: 0;
}
.filterDropdownCheckboxes__label {
  display: block;
  color: #1e1e1e;
}
.filterDropdownCheckboxes__description {
  display: block;
  color: #686868;
}
</style>
