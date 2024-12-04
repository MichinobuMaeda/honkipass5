<script>
  /**
   * @typedef {Object} Props
   * @property {string} id
   * @property {import("svelte").Component} icon
   * @property {function} onClick
   * @property {boolean} [disabled]
   */

  /** @type {Props} */
  let { id, icon, onClick, disabled = false } = $props();

  const SvgIcon = $derived(icon);
</script>

<button
  {id}
  type="button"
  class={"size-10 px-2 py-1 border rounded-full text-base " +
    "bg-lightSurface dark:bg-darkSurface " +
    "border-lightOutline dark:border-darkOutline " +
    "text-lightOnSurface dark:text-darkOnSurface" +
    (disabled ? " opacity-30" : "")}
  onclick={disabled ? () => {} : () => onClick()}
>
  <span class="flex w-6 h-6"><SvgIcon /></span>
</button>
