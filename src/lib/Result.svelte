<script>
  import IconButtonTonal from "./IconButtonTonal.svelte";
  import IconButtonFilled from "./IconButtonFilled.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";
  import SvgContentCopy from "./SvgContentCopy.svelte";
  import SvgRefresh from "./SvgRefresh.svelte";

  import { charSetAll } from "./honkipass";
  import { generateChars, generatePassword } from "./honkipass";

  /**
   * @typedef {Object} Props
   * @property {Object} param
   */

  /** @type {Props} */
  let { param = $bindable() } = $props();

  let chars = $derived(generateChars(param));
  let password = $derived(generatePassword(param));
  const messageGenerated = "パスワードを生成しました";
  let message = $state(messageGenerated);
  let error = $state("");

  $effect(() => {
    message = messageGenerated;
    error = password ? "" : "設定を変更してやり直してください";
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
      {error}
    />
  </div>
  <span class="flex pt-2 gap-4 sm:gap-8">
    <IconButtonTonal
      id="refresh"
      icon={SvgRefresh}
      onClick={() => {
        param = { ...param };
      }}
    />
    <IconButtonFilled
      id="copy"
      icon={SvgContentCopy}
      onClick={() => {
        navigator.clipboard.writeText(password);
        message = "コピーしました";
      }}
      disabled={!!error}
    />
  </span>
</div>
