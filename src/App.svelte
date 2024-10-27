<script>
  import PWABadge from "./lib/PWABadge.svelte";
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";

  import Reset from "./lib/Reset.svelte";
  import Result from "./lib/Result.svelte";
  import Settings from "./lib/Settings.svelte";
</script>

<Header />
<main class="flex justify-center">
  <div
    class="flex flex-col px-2 pt-2 pb-6 gap-4 w-96
      bg-lightBackground dark:bg-darkBackground
      text-lightOnBackground dark:text-darkOnBackground"
  >
    <Result />
    <Settings />
    <Reset />
  </div>
</main>
<Footer />

<PWABadge />

<style>
</style>
