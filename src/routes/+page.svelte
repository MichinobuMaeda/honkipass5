<script>
  import IconButtonFilled from "$lib/ui/IconButtonFilled.svelte";
  import GroupedButton from "$lib/ui/GroupedButton.svelte";
  import IconButtonOutlined from "$lib/ui/IconButtonOutlined.svelte";
  import IconButtonTonal from "$lib/ui/IconButtonTonal.svelte";
  import ButtonTonal from "$lib/ui/ButtonTonal.svelte";
  import Switch from "$lib/ui/Switch.svelte";
  import Filter from "$lib/ui/Filter.svelte";
  import TextFieldOutlined from "$lib/ui/TextFieldOutlined.svelte";

  import SvgResetSettings from "$lib/ui/SvgResetSettings.svelte";
  import SvgRemove from "$lib/ui/SvgRemove.svelte";
  import SvgAdd from "$lib/ui/SvgAdd.svelte";
  import SvgContentCopy from "$lib/ui/SvgContentCopy.svelte";
  import SvgRefresh from "$lib/ui/SvgRefresh.svelte";

  import * as m from "$lib/paraglide/messages.js";
  import { languageTag } from "$lib/paraglide/runtime.js";

  import {
    charSetAll,
    getDefaultValues,
    generateChars,
    generatePassword,
    charSetStd,
    charSetExt,
    minLength,
    isDefaultValues,
  } from "$lib/honkipass.js";

  let param = $state(getDefaultValues());
  let chars = $derived(generateChars(param));
  let password = $derived(generatePassword(param));
  let message = $state(m.generated());
  let error = $state("");

  $effect(() => {
    message = "...";
    error = password ? "" : m.try_again();
    setInterval(() => {
      if (message == "...") {
        message = m.generated();
      }
    }, 500);
  });
</script>

<div class="flex justify-center">
  <div class="font-mono">
    {#each charSetAll.split("") as char, index}
      {#if index > 0 && index % 32 === 0}
        <br />
      {/if}{#if password.indexOf(char) >= 0}
        <span
          class="bg-lightPrimaryContainer
            text-lightOnPrimaryContainer sm:px-0.5
            dark:bg-darkPrimaryContainer dark:text-darkOnPrimaryContainer"
          >{char}</span
        >
      {:else if chars.indexOf(char) >= 0}
        <span class="sm:px-0.5">{char}</span>
      {:else}
        <span class="opacity-30 sm:px-0.5">{char}</span>
      {/if}
    {/each}
  </div>
</div>
<div class="flex flex-row gap-2 sm:gap-8">
  <div class="grow">
    <TextFieldOutlined
      id="password"
      value={password}
      label={m.password()}
      readonly
      monospace
      {message}
      {error}
    />
  </div>
  <span class="flex gap-4 pt-2 sm:gap-8">
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
        message = m.copied();
      }}
      disabled={!!error}
    />
  </span>
</div>

<div class="flex flex-row gap-4 sm:gap-8">
  <IconButtonOutlined
    id="reset"
    icon={SvgResetSettings}
    onClick={() => {
      param = getDefaultValues();
    }}
    disabled={isDefaultValues(param)}
  />
  <div
    class="mt-2 w-20 text-right
      text-lightOnBackground dark:text-darkOnBackground"
  >
    {m.length({ len: param.length })}
  </div>
  <IconButtonTonal
    id="lengthDn"
    icon={SvgRemove}
    onClick={() => {
      if (param.length > minLength) {
        param.length--;
      }
    }}
  />
  <IconButtonTonal
    id="lengthUp"
    icon={SvgAdd}
    onClick={() => {
      param.length++;
    }}
  />
  <ButtonTonal
    id="lengthUp4"
    label="+4"
    onClick={() => {
      param.length += 4;
    }}
  />
</div>
<div class="flex flex-row justify-center gap-2 sm:gap-8">
  <GroupedButton
    id="charSets"
    items={[
      {
        label: m.std({ len: charSetStd.length }),
        value: "s",
        selected: param.charSet === "s",
      },
      {
        label: m.ext({ len: charSetExt.length }),
        value: "e",
        selected: param.charSet === "e",
      },
      {
        label: m.manual(),
        value: "m",
        selected: param.charSet === "m",
      },
    ]}
    bind:value={param.charSet}
  />
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <Switch id="useAllType" bind:checked={param.useAllTypes} />
  <span class="mt-1">{m.all_types()}</span>
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <Switch id="disallowRepeatUse" bind:checked={param.uniqueChars} />
  <span class="mt-1">{m.unique_chars()}</span>
</div>
<div class="flex flex-row justify-between gap-2 sm:gap-4">
  <Filter
    id="useUpperCase"
    bind:checked={param.useUpperCase}
    label="ABC"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useLowerCase"
    bind:checked={param.useLowerCase}
    label="abc"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useNumerics"
    bind:checked={param.useNumerics}
    label="123"
    disabled={param.charSet !== "m"}
  />
  <Filter
    id="useSymbol"
    bind:checked={param.useSymbols}
    label="@#$"
    disabled={param.charSet !== "m"}
  />
</div>
<div class="flex flex-row gap-2 sm:gap-4">
  <span class="pt-3">
    <Filter
      id="disallowExclusives"
      bind:checked={param.disallowExcluded}
      label={m.excl()}
      disabled={param.charSet !== "m"}
    />
  </span>
  <span class="grow">
    <TextFieldOutlined
      id="TextFieldOutlined1"
      label={m.excluded_chars()}
      bind:value={param.excluded}
      message=""
      disabled={param.charSet !== "m" || !param.disallowExcluded}
      monospace
    />
  </span>
</div>
{#if languageTag() === "ja"}
  <div class="flex flex-row justify-center gap-1">
    日本語
    <span>|</span>
    <a href="/" hreflang="en" class="text-lightTertiary dark:text-darkTertiary"
      >English</a
    >
  </div>
{:else}
  <div class="flex flex-row justify-center gap-1">
    <a href="/" hreflang="ja" class="text-lightTertiary dark:text-darkTertiary"
      >日本語</a
    >
    <span>|</span>
    English
  </div>
{/if}
