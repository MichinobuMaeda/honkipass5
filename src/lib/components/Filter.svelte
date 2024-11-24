<script>
  import SvgCheck from "../icons/SvgCheck.svelte";

  /**
   * @typedef {Object} Props
   * @property {string} id
   * @property {string} label
   * @property {Object} checked
   * @property {boolean} [disabled]
   */

  /** @type {Props} */
  let { id, label, checked = $bindable(), disabled = false } = $props();
</script>

<button
  {id}
  type="button"
  class={"pr-4 py-0.5 rounded-lg h-8 text-base " +
    (disabled
      ? checked
        ? "opacity-50 pl-1 border-none " +
          "bg-lightSurfaceDim dark:bg-darkSurfaceDim " +
          "text-lightOnSurface dark:text-darkOnSurface"
        : "opacity-50 pl-4 border " +
          "bg-lightSurface dark:bg-darkSurface " +
          "text-lightOnSurface dark:text-darkOnSurface " +
          "border-lightOutlineVariant dark:border-darkOutlineVariant"
      : checked
        ? "pl-1 border-none " +
          "bg-lightPrimaryContainer dark:bg-darkPrimaryContainer " +
          "text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer"
        : "pl-4 border " +
          "bg-lightSurface dark:bg-darkSurface " +
          "text-lightOnSurface dark:text-darkOnSurface " +
          "border-lightOutlineVariant dark:border-darkOutlineVariant")}
  onclick={disabled
    ? () => {}
    : () => {
        checked = !checked;
      }}
>
  <span class="flex flex-row gap-0.5">
    {#if checked}
      <SvgCheck />
    {/if}
    {label}
  </span>
</button>
