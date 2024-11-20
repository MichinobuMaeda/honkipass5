<script>
  import { ParaglideJS } from "@inlang/paraglide-sveltekit";
  import { version } from "$app/environment";
  import { i18n } from "$lib/i18n";
  import PWABadge from "$lib/PWABadge.svelte";
  import "../app.css";
  let { children } = $props();
</script>

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
        <h1 class="flex flex-row p-1 text-2xl">
          <img
            src="/favicon.svg"
            alt="Honkipass v5 Logo"
            class="mr-2 h-8 w-8"
          />
          本気でパスワード v5
        </h1>
      </header>

      <main class="mb-auto flex justify-center">
        <div class="flex flex-col gap-4 px-1 pb-6 pt-4 sm:gap-8 sm:pt-8">
          <ParaglideJS {i18n}>
            {@render children()}
          </ParaglideJS>
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

<PWABadge />
