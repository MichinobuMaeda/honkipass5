import PropTypes from "prop-types";
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AppBar from "./xuan-paper/AppBar.jsx";
import PWABadge from "./xuan-paper/PWABadge.jsx";
import Button from "./xuan-paper/Button.jsx";
import ButtonGroup from "./xuan-paper/ButtonGroup.jsx";
import TextField from "./xuan-paper/TextField.jsx";
import Slider from "./xuan-paper/Slider.jsx";
import Switch from "./xuan-paper/Switch.jsx";
import ToggleLanguageButton from "./xuan-paper/ToggleLanguageButton.jsx";
import ToggleDarkModeButton from "./xuan-paper/ToggleDarkModeButton.jsx";

import SvgContentCopy from "./icons/SvgContentCopy.jsx";
import SvgRefresh from "./icons/SvgRefresh.jsx";
import SvgResetSettings from "./icons/SvgResetSettings.jsx";

import "./App.css";
import appLogo from "/favicon.svg";
import {
  charSetAll,
  charSetStd,
  charSetExt,
  defaultExcludedChars,
  generateChars,
  generatePassword,
} from "./honkipass.js";

const bgColor = "bg-light-surface-variant dark:bg-dark-surface-variant";

const Row = ({ children }) => {
  return (
    <div
      className={`flex flex-wrap px-4 sm:px-8 gap-4 sm:gap-8
        justify-start items-center`}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
};

const Char = ({ chr, disabled, used }) => (
  <span
    className={`px-0.5 ${
      disabled
        ? `bg-light-surface-container-high/50 dark:bg-dark-surface-container-high/50
              text-light-on-surface/30 dark:text-dark-on-surface/30`
        : used
          ? `bg-light-tertiary-container dark:bg-dark-tertiary-container
                text-light-tertiary dark:text-dark-tertiary`
          : "text-light-on-form dark:text-dark-on-form"
    }`}
  >
    {chr}
  </span>
);

Char.propTypes = {
  chr: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  used: PropTypes.bool.isRequired,
};

function App() {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("generated");

  const lengthList = [6, 8, 10, 12, 16, 20, 24, 30, 36, 48, 64, 128];
  const [lengthIndex, setLengthIndex] = useState(1);
  const length = useMemo(() => lengthList[lengthIndex]);

  const presetList = [
    { label: t("std", { len: charSetStd.length }), value: "s" },
    { label: t("ext", { len: charSetExt.length }), value: "e" },
    { label: t("manual"), value: "m" },
  ];
  const [preset, setPreset] = useState("s");

  const charTypeList = [
    { label: "abc", value: "l" },
    { label: "ABC", value: "u" },
    { label: "123", value: "n" },
    { label: "@#$", value: "s" },
  ];
  const charTypeValues = charTypeList.map((item) => item.value);
  const [charTypes, setCharTypes] = useState(charTypeValues);

  const [allTypes, setAllTypes] = useState(true);
  const [uniqueChars, setUniqueChars] = useState(true);
  const [applyExcluded, setApplyExcluded] = useState(true);
  const [excludedChars, setExcludedChars] = useState(defaultExcludedChars);

  const reset = () => {
    setLengthIndex(1);
    setPreset("s");
    setCharTypes(charTypeValues);
    setAllTypes(true);
    setUniqueChars(true);
    setApplyExcluded(true);
    setExcludedChars(defaultExcludedChars);
  };

  const params = useMemo(
    () => ({
      length,
      preset,
      lowerCase: charTypes.includes("l"),
      upperCase: charTypes.includes("u"),
      numerics: charTypes.includes("n"),
      symbols: charTypes.includes("s"),
      allTypes,
      uniqueChars,
      applyExcluded,
      excludedChars,
    }),
    [
      length,
      preset,
      charTypes,
      allTypes,
      uniqueChars,
      applyExcluded,
      excludedChars,
    ],
  );

  const chars = useMemo(() => generateChars(params), [params]);

  const changed = useMemo(
    () =>
      lengthIndex !== 1 ||
      preset !== "s" ||
      charTypeValues.length != charTypes.length ||
      charTypeValues.some((v) => !charTypes.includes(v)) ||
      !allTypes ||
      !uniqueChars ||
      !applyExcluded ||
      excludedChars !== defaultExcludedChars,
    [
      lengthIndex,
      preset,
      charTypes,
      allTypes,
      uniqueChars,
      applyExcluded,
      excludedChars,
    ],
  );

  const refresh = () => {
    setMessage("please wait");
    const generated = generatePassword(params, chars);
    if (generated) {
      setPassword(generated);
      setTimeout(() => {
        setMessage("generated");
      }, 100);
    } else {
      setTimeout(() => {
        setMessage("try again");
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

  return (
    <div className="flex flex-col items-center">
      <AppBar
        appLogo={
          <img
            src={appLogo}
            className="size-8 min-w-8"
            alt={`${t("app title")} logo`}
          />
        }
        appName={t("app title")}
        suffix={[
          <ToggleLanguageButton key="language-toggle" />,
          <ToggleDarkModeButton key="dark-mode-toggle" />,
        ]}
        height={10}
      />
      <main
        className={`flex flex-col w-full sm:max-w-[640px] px-2 pb-14 pt-12`}
      >
        <PWABadge />
        <div
          className={`flex flex-row
           bg-light-form dark:bg-dark-form`}
        >
          <div
            className={`flex flex-row pl-2 pr-4 sm:pr-6 py-1 grow
              rounded-br-4xl ${bgColor}`}
          >
            <TextField
              value={password}
              message={t(message)}
              fontFamily="font-mono"
              prefix={
                <Button
                  icon={<SvgContentCopy />}
                  style="embedded"
                  onClick={copy}
                />
              }
              suffix={
                <Button
                  icon={<SvgRefresh />}
                  style="embedded"
                  onClick={refresh}
                />
              }
              width="w-full"
              readonly
            />
          </div>
          <div className={`flex flex-row pt-3 ${bgColor}`}>
            <div
              className={`flex flex-row px-4 sm:px-6 items-center rounded-t-4xl
                bg-light-form dark:bg-dark-form`}
            >
              <Button
                icon={<SvgResetSettings />}
                onClick={reset}
                disabled={!changed}
                style="outlined"
              />
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col sm:px-2 pt-4 pb-8 gap-4
            rounded-tl-4xl rounded-b-4xl
            bg-light-form dark:bg-dark-form
            text-light-on-form dark:text-dark-on-form`}
        >
          <Row>
            <div className="flex flex-wrap font-mono">
              {charSetAll.split("").map((c) => (
                <Char
                  key={c}
                  chr={c}
                  disabled={!chars.includes(c)}
                  used={password.includes(c)}
                />
              ))}
            </div>
          </Row>
          <Row>
            <Slider
              count={lengthList.length - 1}
              value={lengthIndex}
              onChange={(v) => setLengthIndex(v)}
              width="w-3/5 sm:w-108"
            />
            <div className="flex grow justify-end">
              {t("length", { len: length })}
            </div>
          </Row>
          <Row>
            <ButtonGroup
              items={presetList}
              value={preset}
              onChange={(v) => setPreset(v)}
            />
          </Row>
          <Row>
            <ButtonGroup
              items={charTypeList}
              value={charTypes}
              onChange={(v) => {
                const prev = [...charTypes];
                if (v.length === 0) {
                  setCharTypes(prev);
                } else {
                  setCharTypes(v);
                }
              }}
              multiSelect
              disabled={preset !== "m"}
            />
          </Row>
          <Row>
            <TextField
              value={excludedChars}
              label={t("excluded chars")}
              onChange={(v) => setExcludedChars(v)}
              fontFamily="font-mono"
              width="grow"
              disabled={preset !== "m" || !applyExcluded}
            />
            <Switch
              value={applyExcluded}
              onChange={(v) => setApplyExcluded(v)}
              disabled={preset !== "m"}
            />
          </Row>
          <Row>
            <span className="flex grow">{t("all types")}</span>
            <Switch value={allTypes} onChange={(v) => setAllTypes(v)} />
          </Row>
          <Row>
            <span className="flex grow">{t("unique chars")}</span>
            <Switch value={uniqueChars} onChange={(v) => setUniqueChars(v)} />
          </Row>
        </div>
      </main>
      <footer>
        © 2024-2025 Michinobu Maeda
        <a href="https://github.com/MichinobuMaeda/honkipass5">GitHub</a>
      </footer>
    </div>
  );
}

export default App;
