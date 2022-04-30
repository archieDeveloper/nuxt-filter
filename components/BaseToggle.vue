<script lang="ts">
import {Component, Emit, Model, Vue} from 'nuxt-property-decorator'

@Component
export default class BaseToggle extends Vue {
  @Model('set-open', { type: Boolean, default: false }) readonly isOpen!: boolean

  render() {
    return this.$scopedSlots.default!({
      isOpen: this.isOpen,

      close: this.close,
      toggle: this.toggle,
      open: this.open,
      setOpen: this.setOpen,
    }) as any;
  }


  @Emit()
  setOpen(isOpen: boolean): boolean {
    return isOpen;
  }

  open(): void {
    this.setOpen(true);
  }

  close(): void {
    this.setOpen(false);
  }

  toggle(): void {
    this.setOpen(!this.isOpen);
  }
}
</script>
