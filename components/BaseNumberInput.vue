<template>
  <input type="tel" @input="inputField" @paste="paste" :value="value">
</template>

<script lang="ts">
import {Component, Emit, Model, Vue} from 'nuxt-property-decorator'


const numberClamp = function (number: number, min: number, max: number): number {
  return numberClampMax(numberClampMin(number, min), max);
};

const numberClampMin = function (number: number, min: number): number {
  return Math.max(number, min);
};

const numberClampMax = function (number: number, max: number) {
  return Math.min(number, max);
};

@Component({
})
export default class PageIndex extends Vue {
  @Model('input', { type: String, default: '' }) readonly value!: string

  @Emit()
  input(value: string): string {
    return value;
  }

  inputField(e: InputEvent) {
    const inputElement: HTMLInputElement = e?.target as HTMLInputElement;
    const valueRaw: string = String(inputElement?.value || '');
    let formattedValue: string = this.formattedValue(valueRaw, inputElement.maxLength);
    let selectionOffset: number = formattedValue.length - valueRaw.length;
    const selectionEnd: number = inputElement.selectionEnd || 0;
    const inputType: string = e?.inputType || '';
    let directionRemove = -1;
    if (inputType === 'deleteContentBackward') {
      directionRemove = 1;
    } else if (inputType === 'deleteContentForward') {
      directionRemove = 0;
    }
    if (directionRemove >= 0 && formattedValue[selectionEnd] === ' ' && selectionOffset === 1) {
      const secondPartIndex = selectionEnd + (1 - directionRemove);
      const valueWithCharRemoved = valueRaw.slice(0, secondPartIndex - 1) + valueRaw.slice(secondPartIndex);
      formattedValue = this.formattedValue(valueWithCharRemoved, inputElement.maxLength);
      selectionOffset = (formattedValue.length - valueWithCharRemoved.length) - (directionRemove * 2);
    }
    inputElement.value = formattedValue;
    const selectionPosition = numberClamp(selectionEnd + selectionOffset, 0, formattedValue.length);
    setTimeout(() => {
      inputElement.setSelectionRange(selectionPosition, selectionPosition);
    }, 0)
    if (formattedValue !== this.value) {
      this.input(formattedValue);
    }
  }

  formattedValue(valueRaw: string, maxLength: number = -1): string {
    let formattedValue = valueRaw.replace(/\D/g,'');
    const clearMaxLength = maxLength - Math.floor(Math.abs(maxLength / 4));
    if (clearMaxLength >= 0) {
      formattedValue = formattedValue.slice(0, clearMaxLength);
    }
    formattedValue = formattedValue.split('').reverse().join('').replace(/(.{3})/g, '$1 ').trim().split('').reverse().join('');
    return formattedValue;
  }

  paste($event: ClipboardEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    const getData: string = $event?.clipboardData?.getData("Text") || '';
    const inputElement: HTMLInputElement = $event?.target as HTMLInputElement;
    const valueRaw: string = String(inputElement?.value || '');
    const selectionStart: number = inputElement.selectionStart || 0;
    const selectionEnd: number = inputElement.selectionEnd || 0;
    const newText = valueRaw.substring(0, selectionStart) + getData + valueRaw.substring(selectionEnd, valueRaw.length);
    let formattedValue = this.formattedValue(newText, inputElement.maxLength);
    const selectionOffset: number = formattedValue.length - valueRaw.length;
    inputElement.value = formattedValue;
    const selectionPosition = numberClamp(selectionEnd + selectionOffset, 0, formattedValue.length);
    setTimeout(() => {
      inputElement.setSelectionRange(selectionPosition, selectionPosition);
    }, 0);
    const evt = new Event("input", {
      bubbles: false,
      cancelable: true,
    });
    inputElement.dispatchEvent(evt);
    return false;
  }
}
</script>
