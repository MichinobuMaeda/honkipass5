<script>
  import PWABadge from "./lib/PWABadge.svelte";
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  import Result from "./lib/Result.svelte";
  import Settings from "./lib/Settings.svelte";
  import { getDefaultValues } from "./lib/honkipass";

  let param = $state(getDefaultValues());
</script>

<div
  class="flex flex-row justify-center
    bg-lightSurfaceVariant dark:bg-darkSurfaceVariant"
>
  <div
    class="flex flex-col w-full max-w-screen-sm
      bg-lightBackground dark:bg-darkBackground
      text-lightOnBackground dark:text-darkOnBackground"
  >
    <div class="flex flex-col min-h-screen justify-between">
      <Header />
      <main class="flex justify-center mb-auto">
        <div class="flex flex-col px-1 pt-4 sm:pt-8 pb-6 gap-4 sm:gap-8">
          <Result bind:param />
          <Settings bind:param />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</div>

<PWABadge />
