import { Module, VuexModule, VuexMutation, MutationAction } from 'nuxt-property-decorator';
import {RangeFormattedNumber} from "~/types/Range";

@Module({ stateFactory: true })
export default class FilterModule extends VuexModule {
  _roomsSelected: string[] = []
  _decorationsSelected: string[] = []
  _rangePrice: RangeFormattedNumber = ['', '']

  get roomsSelected(): string[] {
    return this._roomsSelected;
  }
  get decorationsSelected(): string[] {
    return this._decorationsSelected;
  }
  get rangePrice(): RangeFormattedNumber {
    return this._rangePrice;
  }

  @VuexMutation
  setRoomsSelected(roomSelected: string[]): void {
    this._roomsSelected = roomSelected;
  }
  @VuexMutation
  setDecorationsSelected(decorationsSelected: string[]): void {
    this._decorationsSelected = decorationsSelected;
  }
  @VuexMutation
  setRangePrice(rangePrice: RangeFormattedNumber): void {
    this._rangePrice = rangePrice;
  }
}
