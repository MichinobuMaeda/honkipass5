<script>
  /**
   * @typedef {Object} Props
   * @property {string} id
   * @property {string} [type]
   * @property {string} value
   * @property {string} label
   * @property {string} [message]
   * @property {string} [error]
   * @property {boolean} [readonly]
   * @property {boolean} [disabled]
   * @property {boolean} [monospace]
   */

  /** @type {Props} */
  let {
    id,
    type = "text",
    value = $bindable(),
    label,
    message = "",
    error = "",
    readonly = false,
    disabled = false,
    monospace = false,
  } = $props();
</script>

<div class={"flex grow flex-col" + (disabled ? " opacity-40" : "")}>
  <label
    for={id}
    class="relative mt-2 block rounded-md border border-lightOutline bg-lightSurface
      px-2 py-2
      focus-within:border-lightOutline dark:border-darkOutline
      dark:bg-darkSurface focus-within:dark:border-darkOutline"
  >
    <input
      {id}
      {type}
      bind:value
      class={"peer w-full border-none text-base " +
        "focus:border-none focus:outline-none focus:ring-0 " +
        "bg-lightSurface dark:bg-darkSurface " +
        "text-lightOnSurface dark:text-darkOnSurface " +
        "placeholder-lightSurface dark:placeholder-darkSurface" +
        (monospace ? " font-mono" : "")}
      placeholder={label}
      {readonly}
      {disabled}
    />
    <span
      class="pointer-events-none absolute
        start-2 top-0 -translate-y-1/2
        bg-lightSurface p-0.5 text-xs text-lightOnSurfaceVariant transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm
        peer-focus:top-0 peer-focus:text-xs
        dark:bg-darkSurface dark:text-darkOnSurfaceVariant"
    >
      {label}
    </span>
  </label>
  {#if !error}
    <div
      class="pl-2 text-sm
        text-lightOnSurface dark:text-darkOnSurface"
    >
      {message}
    </div>
  {:else}
    <div
      class="pl-2 text-sm
        text-lightError dark:text-darkError"
    >
      {error}
    </div>
  {/if}
</div>
