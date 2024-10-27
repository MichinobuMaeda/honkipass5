<script>
  export let id;
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
  on:click={disabled ? () => {} : ouClick}>{label}</button
>
