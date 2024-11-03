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
  class={"px-5 py-1.5 border-none rounded-full h-10 text-base " +
    (disabled
      ? "opacity-50 bg-lightSurfaceDim dark:bg-darkSurfaceDim text-lightOnSurface dark:text-darkOnSurface"
      : "bg-lightPrimaryContainer dark:bg-darkPrimaryContainer text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer")}
  on:click={disabled ? () => {} : ouClick}
>
  <span class="flex flex-row gap-0.5">
    {#if icon !== null}
      <svelte:component this={icon} />
    {/if}
    {label}
  </span>
</button>
