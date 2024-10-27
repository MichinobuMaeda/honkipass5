<script>
  import SvgCheck from "./SvgCheck.svelte";

  export let id;
  export let items;
  export let onClick;
</script>

<div {id} role="group" class="inline-flex rounded-md shadow-sm h-10 text-base">
  {#each items as item, index}
    <button
      type="button"
      on:click={() => {
        items.forEach((item) => {
          item.selected = false;
        });
        item.selected = true;
        onClick(item.value);
      }}
      class={(index == 0
        ? "pr-4 py-1.5 border-t border-b border-l rounded-l-full"
        : index == items.length - 1
          ? "pr-4 py-1.5 border rounded-r-full"
          : "pr-4 py-1.5 border-t border-b border-l") +
        " border-lightOutline dark:border-darkOutline" +
        (item.selected
          ? " pl-2 bg-lightSecondaryContainer dark:bg-darkSecondaryContainer text-lightOnSecondaryContainer dark:text-darkOnSecondaryContainer"
          : " pl-4 bg-lightSurface dark:bg-darkSurface text-lightOnSurface dark:text-darkOnSurface")}
    >
      <span class="flex flex-row">
        {#if item.selected}
          <SvgCheck />
        {/if}
        {item.label}
      </span>
    </button>
  {/each}
</div>
