<script>
  import SvgCheck from "./SvgCheck.svelte";

  export let id;
  export let label;
  export let checked = false;
  export let ouClick;
  export let disabled = false;
</script>

<button
  {id}
  type="button"
  class={"pr-4 py-0.5 rounded-lg h-8 text-base " +
    (disabled
      ? checked
        ? "opacity-50 pl-1 border-none bg-lightSurfaceDim dark:bg-darkSurfaceDim text-lightOnSurface dark:text-darkOnSurface"
        : "opacity-50 pl-4 border bg-lightSurface dark:bg-darkSurface text-lightOnSurface dark:text-darkOnSurface border-lightOutlineVariant dark:border-darkOutlineVariant"
      : checked
        ? "pl-1 border-none bg-lightPrimaryContainer dark:bg-darkPrimaryContainer text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer"
        : "pl-4 border bg-lightSurface dark:bg-darkSurface text-lightOnSurface dark:text-darkOnSurface border-lightOutlineVariant dark:border-darkOutlineVariant")}
  on:click={disabled ? () => {} : () => ouClick(!checked)}
>
  <span class="flex flex-row">
    {#if checked}
      <SvgCheck />
    {/if}
    {label}
  </span>
</button>
