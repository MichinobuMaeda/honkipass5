<script>
  import PWABadge from "./lib/PWABadge.svelte";

  import IconButtonFilled from "./lib/components/IconButtonFilled.svelte";
  import GroupedButton from "./lib/components/GroupedButton.svelte";
  import IconButtonOutlined from "./lib/components/IconButtonOutlined.svelte";
  import IconButtonTonal from "./lib/components/IconButtonTonal.svelte";
  import ButtonTonal from "./lib/components/ButtonTonal.svelte";
  import Switch from "./lib/components/Switch.svelte";
  import Filter from "./lib/components/Filter.svelte";
  import TextFieldOutlined from "./lib/components/TextFieldOutlined.svelte";
  import { version } from "../package.json";
  import { langButtonName, m, toggleLang } from "./lib/i18n.svelte.js";

  import SvgResetSettings from "./lib/icons/SvgResetSettings.svelte";
  import SvgRemove from "./lib/icons/SvgRemove.svelte";
  import SvgAdd from "./lib/icons/SvgAdd.svelte";
  import SvgContentCopy from "./lib/icons/SvgContentCopy.svelte";
  import SvgRefresh from "./lib/icons/SvgRefresh.svelte";

  import {
    charSetAll,
    getDefaultValues,
    generateChars,
    generatePassword,
    charSetStd,
    charSetExt,
    minLength,
    isDefaultValues,
  } from "./lib/honkipass.js";

  let param = $state(getDefaultValues());
  let chars = $derived(generateChars(param));
  let password = $derived(generatePassword(param));
  let passwordMessage = $state("");
  let message = $derived(
    passwordMessage === "copied"
      ? m().copied()
      : passwordMessage === "generated"
        ? m().generated()
        : passwordMessage === "wait"
          ? "..."
          : "",
  );
  let error = $derived(passwordMessage === "try_again" ? m().try_again() : "");

  $effect(() => {
    if (password) {
      passwordMessage = "wait";
      setTimeout(() => {
        passwordMessage = "generated";
      }, 100);
    } else {
      passwordMessage = "try_again";
    }
  });

  const copy = () => {
    navigator.clipboard.writeText(password);
    passwordMessage = "wait";
    setTimeout(() => {
      passwordMessage = "copied";
    }, 100);
  };
</script>

<svelte:head>
  <title>{m().appTitle()} v5</title>
</svelte:head>

<div
  class="flex flex-row justify-center
    bg-lightSurfaceVariant dark:bg-darkSurfaceVariant"
>
  <div
    class="flex w-full max-w-screen-sm flex-col
      bg-lightBackground dark:bg-darkBackground
      text-lightOnBackground dark:text-darkOnBackground"
  >
    <div class="flex min-h-screen flex-col justify-between">
      <header
        class="flex
          bg-lightPrimaryContainer dark:bg-darkPrimaryContainer
          text-lightOnPrimaryContainer dark:text-darkOnPrimaryContainer"
      >
        <h1 class="flex flex-row mr-auto p-1 text-xl">
          <img
            src="/favicon.svg"
            alt="Honkipass v5 Logo"
            class="mr-2 h-8 w-8"
          />
          {m().appTitle()} v5
        </h1>
        <div class="flex flex-row px-2">
          <button
            class="text-lightPrimary dark:text-darkPrimary"
            onclick={toggleLang}>&raquo; {langButtonName()}</button
          >
        </div>
      </header>

      <PWABadge />

      <main class="mb-auto flex justify-center">
        <div class="flex flex-col gap-4 px-1 pb-6 pt-4 sm:gap-8 sm:pt-8">
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
                label={m().password()}
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
                onClick={copy}
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
              {m().length({ len: param.length })}
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
                  label: m().std({ len: charSetStd.length }),
                  value: "s",
                },
                {
                  label: m().ext({ len: charSetExt.length }),
                  value: "e",
                },
                {
                  label: m().manual(),
                  value: "m",
                },
              ]}
              bind:value={param.charSet}
            />
          </div>
          <div class="flex flex-row gap-2 sm:gap-4">
            <Switch id="useAllType" bind:checked={param.useAllTypes} />
            <span class="mt-1">{m().all_types()}</span>
          </div>
          <div class="flex flex-row gap-2 sm:gap-4">
            <Switch id="disallowRepeatUse" bind:checked={param.uniqueChars} />
            <span class="mt-1">{m().unique_chars()}</span>
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
                label={m().excl()}
                disabled={param.charSet !== "m"}
              />
            </span>
            <span class="grow">
              <TextFieldOutlined
                id="TextFieldOutlined1"
                label={m().excluded_chars()}
                bind:value={param.excluded}
                message=""
                disabled={param.charSet !== "m" || !param.disallowExcluded}
                monospace
              />
            </span>
          </div>
        </div>
      </main>
      <footer
        class="flex flex-row gap-1 text-base px-4 py-1
          bg-lightSecondary dark:bg-darkSecondary
          text-lightOnSecondary dark:text-darkOnSecondary"
      >
        © 2024 Michinobu Maeda
        <a
          class="mx-2 underline underline-offset-2
            text-lightInversePrimary dark:text-darkInversePrimary"
          href="https://github.com/MichinobuMaeda/honkipass5"
        >
          GitHub
        </a>
        v{version}
      </footer>
    </div>
  </div>
</div>
