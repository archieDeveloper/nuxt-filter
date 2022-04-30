<template>
  <div>
    <div class="filter">
      <FilterCheckboxes
        class="filter__item"
        :value="getterRoomsSelected"
        :controls="roomsControls"
        @input="onChangeRooms"
      />

      <FilterDropdownCheckboxes
        class="filter__item filter__item_decoration"
        :value="getterDecorationsSelected"
        :controls="decorationControls"
        placeholder="Отделка"
        @input="onChangeDecorations"
      />

      <FilterNumberRange
        class="filter__item"
        placeholder-from="Цена от"
        placeholder-to="до"
        :max-length="13"
        :value="getterRangePrice"
        @input="onChangeRangePrice"
      >₽</FilterNumberRange>
    </div>
    <div>
      <button @click="clearAll" class="button">Очистить</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
const filterModule = namespace('filter');
import FilterCheckboxes from "~/components/FilterCheckboxes.vue";
import BaseNumberInput from "~/components/BaseNumberInput.vue";
import FilterNumberRange from "~/components/FilterNumberRange.vue";
import FilterDropdownCheckboxes from "~/components/FilterDropdownCheckboxes.vue";
import {RangeFormattedNumber} from "~/types/Range";
import {IControl, IControlWithDescription} from "~/types/Control";
@Component({
  components: {FilterDropdownCheckboxes, FilterNumberRange, FilterCheckboxes,BaseNumberInput,}
})
export default class PageIndex extends Vue {
  @filterModule.Mutation('setRangePrice') mutationSetRangePrice!: (rangePrice: RangeFormattedNumber) => void
  @filterModule.Getter('rangePrice') getterRangePrice!: RangeFormattedNumber

  @filterModule.Mutation('setDecorationsSelected') mutationSetDecorationsSelected!: (decorationsSelected: string[]) => void
  @filterModule.Getter('decorationsSelected') getterDecorationsSelected!: string[]

  @filterModule.Mutation('setRoomsSelected') mutationSetRoomsSelected!: (roomsSelected: string[]) => void
  @filterModule.Getter('roomsSelected') getterRoomsSelected!: string[]

  decorationControls: IControlWithDescription[] = [
    {
      value: "1",
      label: "Первый",
      description: "Первое описание",
    },
    {
      value: "2",
      label: "Второй",
      description: "Второе описание",
    },
    {
      value: "3",
      label: "Третий",
      description: "Третье описание состоящее из пяти слов состоящее из пяти слов",
    },
  ]
  roomsControls: IControl[] = [
    {
      value: "1",
      label: "Первый",
    },
    {
      value: "2",
      label: "Второй",
    },
  ]

  onChangeRooms(roomsSelected: string[]): void {
    this.mutationSetRoomsSelected(roomsSelected);
  }

  onChangeDecorations(decorationsSelected: string[]): void {
    this.mutationSetDecorationsSelected(decorationsSelected);
  }

  onChangeRangePrice(rangePrice: RangeFormattedNumber): void {
    this.mutationSetRangePrice(rangePrice);
  }

  clearAll(): void {
    this.onChangeRooms([]);
    this.onChangeDecorations([]);
    this.onChangeRangePrice(['', '']);
  }
}
</script>
