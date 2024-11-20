<script>
  // @ts-nocheck

  import { useRegisterSW } from "virtual:pwa-register/svelte";

  // periodic sync is disabled, change the value to enable it, the period is in milliseconds
  // You can remove onRegisteredSW callback and registerPeriodicSync function
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

  needRefresh.subscribe((v) => {
    if (v) {
      updateServiceWorker(true);
    }
  });
</script>
