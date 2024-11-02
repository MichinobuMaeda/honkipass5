<script>
  import PWABadge from "./lib/PWABadge.svelte";
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  import Reset from "./lib/Reset.svelte";
  import Result from "./lib/Result.svelte";
  import Settings from "./lib/Settings.svelte";
</script>

<div
  class="@apply flex flex-row justify-center
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
        <div class="flex flex-col px-2 pt-2 sm:pt-8 pb-6 gap-4 sm:gap-8">
          <Result />
          <Settings />
          <Reset />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</div>

<PWABadge />

<style>
</style>
