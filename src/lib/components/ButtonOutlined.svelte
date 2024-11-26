<script>
  /**
   * @typedef {Object} Props
   * @property {string} id
   * @property {import("svelte").Component?} [icon]
   * @property {string} label
   * @property {function} onClick
   * @property {boolean} [disabled]
   */

  /** @type {Props} */
  let { id, icon = null, label, onClick, disabled = false } = $props();
</script>

<button
  {id}
  type="button"
  class={"px-5 py-1.5 border rounded-full h-10 text-base " +
    "bg-lightSurface dark:bg-darkSurface " +
    "border-lightOutline dark:border-darkOutline " +
    (disabled
      ? "opacity-30 " + "text-lightOnSurface dark:text-darkOnSurface"
      : "text-lightPrimary dark:text-darkPrimary")}
  onclick={disabled ? () => {} : () => onClick()}
>
  <span class="flex flex-row gap-0.5">
    {#if icon !== null}
      {@const SvgIcon = icon}
      <SvgIcon />
    {/if}
    {label}
  </span>
</button>
