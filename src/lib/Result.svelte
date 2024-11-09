<script>
  import ButtonFilled from "./ButtonFilled.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";

  import { charSetAll } from "./honkipass";
  import { generateChars, generatePassword } from "./honkipass";

  /**
   * @typedef {Object} Props
   * @property {Object} param
   */

  /** @type {Props} */
  let { param } = $props();

  let chars = $derived(generateChars(param));
  let password = $derived(generatePassword(param));
  let message = $state("");

  $effect(() => {
    if (password) {
      message = "";
    }
  });
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
      {message}
      error={password ? "" : "設定を変更してやり直してください"}
    />
  </div>
  <span class="pt-2">
    <ButtonFilled
      id="copy"
      label="コピー"
      onClick={() => {
        navigator.clipboard.writeText(password);
        message = "コピーしました";
      }}
      disabled={!password}
    />
  </span>
</div>
