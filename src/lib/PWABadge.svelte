<script>
  // @ts-nocheck

  import { useRegisterSW } from "virtual:pwa-register/svelte";

  import { m } from "./i18n.svelte.js";

  // check for updates every hour
  const period = 60 * 60 * 1000;

  /**
   * This function will register a periodic sync check every hour, you can modify the interval as needed.
   * @param swUrl {string}
   * @param r {ServiceWorkerRegistration}
   */
  function registerPeriodicSync(swUrl, r) {
    if (period <= 0) return;

    setInterval(async () => {
      if ("onLine" in navigator && !navigator.onLine) return;

      const resp = await fetch(swUrl, {
        cache: "no-store",
        headers: {
          cache: "no-store",
          "cache-control": "no-cache",
        },
      });

      if (resp?.status === 200) await r.update();
    }, period);
  }

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          /** @type {ServiceWorker} */
          const sw = e.target;
          if (sw.state === "activated") registerPeriodicSync(swUrl, r);
        });
      }
    },
  });
</script>

{#if $needRefresh}
  <div
    class="flex justify-center py-0.5
      bg-lightErrorContainer dark:bg-darkErrorContainer"
  >
    <button
      type="button"
      class="bg-lightError dark:bg-darkError
        text-lightOnError dark:text-darkOnError
        py-0.5 px-4 rounded-full"
      onclick={() => updateServiceWorker(true)}
    >
      {m().updateApp()}
    </button>
  </div>
{/if}
