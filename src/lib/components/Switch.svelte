<script>
  import SvgCheck from "../icons/SvgCheck.svelte";

  /**
   * @typedef {Object} Props
   * @property {string} id
   * @property {boolean} checked
   */

  /** @type {Props} */
  let { id, checked = $bindable() } = $props();
</script>

<label
  for={id}
  class="relative inline-block h-8 w-14 cursor-pointer rounded-full
    border-2 border-lightOutline
    bg-lightSurfaceVariant transition
    [-webkit-tap-highlight-color:_transparent] has-[:checked]:border-none
    has-[:checked]:bg-lightPrimary dark:border-darkOutline
    dark:bg-darkSurfaceVariant has-[:checked]:dark:bg-darkPrimary"
>
  <input
    type="checkbox"
    {id}
    bind:checked
    class="[&:$checked_+_span_svg[data-checked-icon]]:block [&:$checked_+_span_svg[data-unchecked-icon]]:hidden
      peer
      sr-only"
  />

  <span
    class="absolute inset-y-0 start-0 z-10 m-1.5
      inline-flex size-4
      items-center justify-center
      rounded-full bg-lightOnSurfaceVariant text-lightOnSurfaceVariant
      transition-all peer-checked:start-6
      peer-checked:m-1 peer-checked:size-6
      peer-checked:bg-lightSurface peer-checked:text-lightPrimary
      dark:bg-darkOnSurfaceVariant dark:text-darkOnSurfaceVariant
      peer-checked:dark:bg-darkSurface peer-checked:dark:text-darkPrimary"
  >
    <SvgCheck />
  </span>
</label>
