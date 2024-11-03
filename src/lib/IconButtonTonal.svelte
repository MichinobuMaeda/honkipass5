<script>
  export let id;
  export let icon;
  export let ouClick;
  export let disabled = false;
</script>

<button
  {id}
  type="button"
  class={"size-10 p-2 border-none rounded-full text-base " +
    (disabled
      ? "opacity-50 bg-lightSurfaceDim dark:bg-darkSurfaceDim text-lightOnSurface dark:text-darkOnSurface"
      : "bg-lightPrimaryContainer dark:bg-darkPrimaryContainer text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer")}
  on:click={disabled ? () => {} : ouClick}
>
  <svelte:component this={icon} />
</button>
