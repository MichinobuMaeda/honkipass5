<script>
  import ButtonFilled from "./ButtonFilled.svelte";
  import TextFieldOutlined from "./TextFieldOutlined.svelte";

  import { password, chars, charSetAll } from "../state.svelte";
</script>

<div class="flex justify-center">
  <div class="font-mono">
    {#each charSetAll.split("") as char, index}
      {#if index > 0 && index % 32 === 0}
        <br />
      {/if}{#if $password.indexOf(char) >= 0}
        <span
          class="bg-lightPrimaryContainer dark:bg-darkPrimaryContainer
            text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer"
          >{char}</span
        >
      {:else if $chars.indexOf(char) >= 0}
        <span class="">{char}</span>
      {:else}
        <span class="opacity-30">{char}</span>
      {/if}
    {/each}
  </div>
</div>
<div class="flex flex-row gap-2">
  <div class="grow">
    <TextFieldOutlined
      id="password"
      value={$password}
      label="パスワード"
      ouInput={() => {}}
      readonly
      monospace
    />
  </div>
  <span class="pt-2">
    <ButtonFilled
      id="copy"
      label="コピー"
      ouClick={() => navigator.clipboard.writeText($password)}
    />
  </span>
</div>
