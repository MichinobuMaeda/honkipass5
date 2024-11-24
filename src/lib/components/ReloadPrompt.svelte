<script>
  // @ts-nocheck

  import { useRegisterSW } from "virtual:pwa-register/svelte";
  // const buildDate = "__DATE__";
  // const reloadSW = JSON.parse("__RELOAD_SW__");
  const reloadSW = JSON.parse("true");
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            console.log("Checking for sw update");
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        console.log(`SW Registered: ${r}`);
      }
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    },
  });
  // const close = () => {
  //   offlineReady.set(false);
  //   needRefresh.set(false);
  // };
  $: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
  {#if $needRefresh}
    <button on:click={() => updateServiceWorker(true)}> Reload </button>
  {/if}
{/if}
