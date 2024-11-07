<script>
  import ButtonFilled from "./ButtonFilled.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";

  import { charSetAll } from "./honkipass";

  /**
   * @typedef {Object} Props
   * @property {string} chars
   * @property {string} password
   */

  /** @type {Props} */
  let { chars, password } = $props();
</script>

<div class="flex justify-center">
  <div class="font-mono">
    {#each charSetAll.split("") as char, index}
      {#if index > 0 && index % 32 === 0}
        <br />
      {/if}{#if password.indexOf(char) >= 0}
        <span
          class="sm:px-0.5
            bg-lightPrimaryContainer dark:bg-darkPrimaryContainer
            text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer"
          >{char}</span
        >
      {:else if chars.indexOf(char) >= 0}
        <span class="sm:px-0.5">{char}</span>
      {:else}
        <span class="sm:px-0.5 opacity-30">{char}</span>
      {/if}
    {/each}
  </div>
</div>
<div class="flex flex-row gap-2 sm:gap-8">
  <div class="grow">
    <TextFieldOutlined
      id="password"
      value={password}
      label="パスワード"
      readonly
      monospace
    />
  </div>
  <span class="pt-2">
    <ButtonFilled
      id="copy"
      label="コピー"
      onClick={() => navigator.clipboard.writeText(password)}
    />
  </span>
</div>
