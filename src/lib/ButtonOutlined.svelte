<script>
  export let id;
  export let icon = null;
  export let label;
  export let ouClick;
  export let disabled = false;
</script>

<button
  {id}
  type="button"
  class={"px-5 py-1.5 border rounded-full h-10 text-base bg-lightSurface dark:bg-darkSurface border-lightOutline dark:border-darkOutline " +
    (disabled
      ? "opacity-30 text-lightOnSurface dark:text-darkOnSurface"
      : "text-lightPrimary dark:text-darkPrimary")}
  on:click={disabled ? () => {} : ouClick}
>
  <span class="flex flex-row gap-0.5">
    {#if icon !== null}
      <svelte:component this={icon} />
    {/if}
    {label}
  </span>
</button>
