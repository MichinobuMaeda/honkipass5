import { useRegisterSW } from "virtual:pwa-register/react";
import { useTranslation } from "react-i18next";
import { Button } from "glassine-paper";
import SvgRefresh from "./icons/SvgRefresh";
import SvgClose from "./icons/SvgClose";
import "./PWABadge.css";

function PWABadge() {
  const { t } = useTranslation();

  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div id="pwa-badge-container">
      {(offlineReady || needRefresh) && (
        <div className="PWABadge-toast">
          <span id="toast-message">
            {t(offlineReady ? "offline ready" : "update app")}
          </span>
          <Button
            variant="error"
            size="sm"
            icon={needRefresh ? <SvgRefresh /> : <SvgClose />}
            onClick={() => (needRefresh ? updateServiceWorker(true) : close())}
          />
        </div>
      )}
    </div>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration,
) {
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
