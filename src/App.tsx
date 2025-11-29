import { useState, useEffect, useMemo, use } from "react";
import { useTranslation } from "react-i18next";
import { Button, Menu, TextField, Slider, Switch } from "glassine-paper";
import PWABadge from "./PWABadge";
import SvgLightMode from "./icons/SvgLightMode";
import SvgDarkMode from "./icons/SvgDarkMode";
import SvgBrightnessAuto from "./icons/SvgBrightnessAuto";
import SvgMoreVert from "./icons/SvgMoreVert";
import SvgContentCopy from "./icons/SvgContentCopy";
import SvgRefresh from "./icons/SvgRefresh";
import SvgResetSettings from "./icons/SvgResetSettings";
import { version } from "../package.json";
import {
  charSetAll,
  charSetStd,
  charSetExt,
  defaultExcludedChars,
  generateChars,
  generatePassword,
} from "./honkipass.js";
import "./App.css";

const rowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  gap: "0.5rem",
};

function App() {
  const { t, i18n } = useTranslation();

  const saved = JSON.parse(
    window.localStorage.getItem("honkipass5-params") || "{}",
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(saved.lang ?? "ja");
  const [brightness, setBrightness] = useState<"light" | "dark" | "light dark">(
    saved.brightness ?? "light dark",
  );

  useEffect(() => {
    document.documentElement.style.setProperty("color-scheme", brightness);
  }, [brightness]);

  const [password, setPassword] = useState("abcdefghijklmnopqrstuvwxyz");
  const [message, setMessage] = useState("generated");
  const [error, setError] = useState(false);

  const lengthList = [6, 8, 10, 12, 16, 20, 24, 30, 36, 48, 64, 128];
  const [lengthIndex, setLengthIndex] = useState(
    saved.length ? lengthList.indexOf(saved.length) : 1,
  );
  const length = useMemo(
    () => lengthList[lengthIndex],
    [lengthIndex, lengthList],
  );
  const [preset, setPreset] = useState<"std" | "ext" | "manual">(
    saved.preset ?? "std",
  );
  const [lowerCase, setLowerCase] = useState(saved.lowerCase ?? true);
  const [upperCase, setUpperCase] = useState(saved.upperCase ?? true);
  const [numerics, setNumerics] = useState(saved.numerics ?? true);
  const [symbols, setSymbols] = useState(saved.symbols ?? true);
  const [allTypes, setAllTypes] = useState(saved.allTypes ?? true);
  const [uniqueChars, setUniqueChars] = useState(saved.uniqueChars ?? true);
  const [applyExcluded, setApplyExcluded] = useState(
    saved.applyExcluded ?? true,
  );
  const [excludedChars, setExcludedChars] = useState(
    saved.excludedChars ?? defaultExcludedChars,
  );

  const params = useMemo(
    () => ({
      length,
      preset,
      lowerCase,
      upperCase,
      numerics,
      symbols,
      allTypes,
      uniqueChars,
      applyExcluded,
      excludedChars,
    }),
    [
      length,
      preset,
      lowerCase,
      upperCase,
      numerics,
      symbols,
      allTypes,
      uniqueChars,
      applyExcluded,
      excludedChars,
    ],
  );

  const chars = useMemo(() => generateChars(params), [params]);
  const changed = useMemo(
    () =>
      params.length !== 8 ||
      params.preset !== "std" ||
      !params.lowerCase ||
      !params.upperCase ||
      !params.numerics ||
      !params.symbols ||
      !params.allTypes ||
      !params.uniqueChars ||
      !params.applyExcluded ||
      params.excludedChars !== defaultExcludedChars,
    [params],
  );

  const refresh = () => {
    setMessage("please wait");
    const generated = generatePassword(params, chars);
    if (generated) {
      setPassword(generated);
      setTimeout(() => {
        setMessage("generated");
        setError(false);
      }, 100);
    } else {
      setTimeout(() => {
        setMessage("try again");
        setError(true);
      }, 100);
    }
  };

  useEffect(() => {
    refresh();
  }, [params]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setMessage("please wait");
    setTimeout(() => {
      setMessage("copied");
    }, 100);
  };

  const reset = () => {
    setLengthIndex(1);
    setPreset("std");
    setLowerCase(true);
    setUpperCase(true);
    setNumerics(true);
    setSymbols(true);
    setAllTypes(true);
    setUniqueChars(true);
    setApplyExcluded(true);
    setExcludedChars(defaultExcludedChars);
  };

  useEffect(() => {
    window.localStorage.setItem(
      "honkipass5-params",
      JSON.stringify({ ...params, lang, brightness }),
    );
  }, [params, lang, brightness]);

  return (
    <>
      <header>
        <img src="./favicon.svg" alt={t("app title")} />
        <h1>{t("app title")}</h1>
        <div className="hidden-xs">
          <Button
            name="language"
            type="select"
            size="xs"
            radius="square"
            icon={<span>En</span>}
            checked={lang === "en"}
            onClick={() => {
              setLang("en");
              i18n.changeLanguage("en");
            }}
          />
          <Button
            name="language"
            type="select"
            size="xs"
            radius="square"
            icon={<span>日</span>}
            checked={lang === "ja"}
            onClick={() => {
              setLang("ja");
              i18n.changeLanguage("ja");
            }}
          />
          <Button
            name="brightness-mode"
            type="select"
            size="xs"
            radius="square"
            icon={<SvgLightMode />}
            checked={brightness === "light"}
            onClick={() => setBrightness("light")}
          />
          <Button
            name="brightness-mode"
            type="select"
            size="xs"
            radius="square"
            icon={<SvgDarkMode />}
            checked={brightness === "dark"}
            onClick={() => setBrightness("dark")}
          />
          <Button
            name="brightness-mode"
            type="select"
            size="xs"
            radius="square"
            icon={<SvgBrightnessAuto />}
            checked={brightness === "light dark"}
            onClick={() => setBrightness("light dark")}
          />
        </div>
        <div className="hidden-sm">
          <Button
            size="xs"
            radius="square"
            variant="tonal"
            icon={<SvgMoreVert />}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </header>
      {menuOpen && (
        <Menu
          id="main-menu"
          items={[
            {
              label: "English",
              active: lang === "en",
              onClick: () => {
                setLang("en");
                i18n.changeLanguage("en");
                setMenuOpen(false);
              },
            },
            {
              label: "日本語",
              active: lang === "ja",
              onClick: () => {
                setLang("ja");
                i18n.changeLanguage("ja");
                setMenuOpen(false);
              },
            },
            { divider: true },
            {
              leadingIcon: <SvgLightMode />,
              label: "Light Mode",
              active: brightness === "light",
              onClick: () => {
                setBrightness("light");
                setMenuOpen(false);
              },
            },
            {
              leadingIcon: <SvgDarkMode />,
              label: "Dark Mode",
              active: brightness === "dark",
              onClick: () => {
                setBrightness("dark");
                setMenuOpen(false);
              },
            },
            {
              leadingIcon: <SvgBrightnessAuto />,
              label: "Auto",
              active: brightness === "light dark",
              onClick: () => {
                setBrightness("light dark");
                setMenuOpen(false);
              },
            },
          ]}
        />
      )}
      <div id="result-area">
        <TextField
          id="result-field"
          value={password}
          leadingIcon={
            <button
              style={{ appearance: "none", border: "none", background: "none" }}
              onClick={() => refresh()}
            >
              <SvgRefresh />{" "}
            </button>
          }
          trailingIcon={
            <button
              style={{ appearance: "none", border: "none", background: "none" }}
              onClick={copy}
            >
              <SvgContentCopy />
            </button>
          }
          supportingText={t(message)}
          error={error}
          readonly
          innerStyle={{ fontFamily: "var(--monospace-font-family)" }}
        />
      </div>
      <main>
        <div>
          <div id="char-map">
            {charSetAll.split("").map((c) => (
              <span
                key={c}
                className={`${!chars.includes(c) ? "disabled" : ""} ${password.includes(c) ? "used" : ""}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            padding: "0.5rem",
          }}
        >
          <Button
            variant="tonal"
            size="sm"
            icon={<SvgResetSettings />}
            onClick={() => reset()}
            disabled={!changed}
          />
          <Slider
            min={0}
            max={lengthList.length - 1}
            step={1}
            options={lengthList.map((_, index) => ({ value: index }))}
            value={lengthIndex}
            displayValue={`${length}`}
            showValueIndicator
            onChange={(value) => setLengthIndex(value)}
            style={{ width: "80%" }}
          />
        </div>
        <div style={rowStyle}>
          <Button
            type="select"
            name="preset"
            size="sm"
            label={t("std", { len: "" + charSetStd.length })}
            checked={preset === "std"}
            onClick={() => setPreset("std")}
          />
          <Button
            type="select"
            name="preset"
            size="sm"
            label={t("ext", { len: "" + charSetExt.length })}
            checked={preset === "ext"}
            onClick={() => setPreset("ext")}
          />
          <Button
            type="select"
            name="preset"
            size="sm"
            label={t("manual")}
            checked={preset === "manual"}
            onClick={() => setPreset("manual")}
          />
        </div>
        <div style={rowStyle}>
          <Button
            type="toggle"
            size="sm"
            label="abc"
            checked={lowerCase}
            onClick={() => setLowerCase(!lowerCase)}
            disabled={preset !== "manual"}
          />
          <Button
            type="toggle"
            size="sm"
            label="ABC"
            checked={upperCase}
            onClick={() => setUpperCase(!upperCase)}
            disabled={preset !== "manual"}
          />
          <Button
            type="toggle"
            size="sm"
            label="123"
            checked={numerics}
            onClick={() => setNumerics(!numerics)}
            disabled={preset !== "manual"}
          />
          <Button
            type="toggle"
            size="sm"
            label="@#$"
            checked={symbols}
            onClick={() => setSymbols(!symbols)}
            disabled={preset !== "manual"}
          />
        </div>
        <div style={{ ...rowStyle, justifyContent: "space-between" }}>
          <TextField
            label={t("excluded chars")}
            value={excludedChars}
            onChange={(e) => setExcludedChars(e.target.value)}
            disabled={preset !== "manual"}
            style={{ width: "75%" }}
            innerStyle={{ fontFamily: "var(--monospace-font-family)" }}
          />
          <Switch
            checked={applyExcluded}
            onClick={() => setApplyExcluded(!applyExcluded)}
            disabled={preset !== "manual"}
          />
        </div>
        <div style={{ ...rowStyle, justifyContent: "space-between" }}>
          {t("all types")}
          <Switch checked={allTypes} onClick={() => setAllTypes(!allTypes)} />
        </div>
        <div style={{ ...rowStyle, justifyContent: "space-between" }}>
          {t("unique chars")}
          <Switch
            checked={uniqueChars}
            onClick={() => setUniqueChars(!uniqueChars)}
          />
        </div>
      </main>
      <footer>
        <span>&copy; 2024, 2025 Michinobu Maeda</span>
        <a href="https://github.com/MichinobuMaeda/glassine-paper">GitHub</a>
        <span onClick={() => window.location.reload()}>v{version}</span>
      </footer>
      <PWABadge />
    </>
  );
}

export default App;
