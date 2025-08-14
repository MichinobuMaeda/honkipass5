import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./App.css";
import PWABadge from "./PWABadge.jsx";
import Button from "./xuan-paper/Button.jsx";
import ButtonGroup from "./xuan-paper/ButtonGroup.jsx";
import TextField from "./xuan-paper/TextField.jsx";
import Slider from "./xuan-paper/Slider.jsx";
import Switch from "./xuan-paper/Switch.jsx";

import SvgContentCopy from "./icons/SvgContentCopy.jsx";
import SvgRefresh from "./icons/SvgRefresh.jsx";
import SvgResetSettings from "./icons/SvgResetSettings.jsx";

import ToggleLanguageButton from "./layout/ToggleLanguageButton.jsx";
import ToggleDarkModeButton from "./layout/ToggleDarkModeButton.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import Row from "./layout/Row.jsx";
import {
  charSetAll,
  charSetStd,
  charSetExt,
  defaultExcludedChars,
  generateChars,
  generatePassword,
} from "./honkipass.js";

function App() {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(t("generated"));

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
    setMessage(t("please wait"));
    const generated = generatePassword(params, chars);
    if (generated) {
      setPassword(generated);
      setTimeout(() => {
        setMessage(t("generated"));
      }, 100);
    } else {
      setTimeout(() => {
        setMessage(t("try again"));
      }, 100);
    }
  };

  useEffect(() => {
    refresh();
  }, [params]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setMessage(t("please wait"));
    setTimeout(() => {
      setMessage(t("copied"));
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <Header
        title={t("app title")}
        suffix={
          <div className="flex flex-row gap-4 items-center ">
            <ToggleLanguageButton />
            <ToggleDarkModeButton />
          </div>
        }
        bottom={<PWABadge />}
      />
      <main
        className={`flex flex-col pt-4 pb-16 gap-4
          w-full sm:max-w-[640px]
          bg-light-form dark:bg-dark-form
          text-light-on-form dark:text-dark-on-form`}
      >
        <div className="flex flex-row px-4 gap-4 items-start">
          <div className="flex flex-row grow">
            <TextField
              label={t("password")}
              value={password}
              message={message}
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
          <Button
            icon={<SvgResetSettings />}
            onClick={reset}
            disabled={!changed}
            style="outlined"
          />
        </div>
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
          <div className="flex flex-wrap font-mono">
            {charSetAll.split("").map((c) => (
              <span
                key={c}
                className={`px-0.5 ${
                  chars.includes(c)
                    ? password.includes(c)
                      ? `bg-light-tertiary-container dark:bg-dark-tertiary-container
                        text-light-tertiary dark:text-dark-tertiary`
                      : "text-light-on-form dark:text-dark-on-form"
                    : `bg-light-surface-container-high/50 dark:bg-light-surface-container-high/50
                      text-light-on-surface/30 dark:text-dark-on-surface/30`
                }`}
              >
                {c}
              </span>
            ))}
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
          <div className="flex flex-row w-full items-center gap-2 sm:gap-4">
            <div className="flex grow">
              <TextField
                value={excludedChars}
                label={t("excluded chars")}
                onChange={(v) => setExcludedChars(v)}
                fontFamily="font-mono"
                width="max-w-full sm:w-full"
                disabled={preset !== "m" || !applyExcluded}
              />
            </div>
            <Switch
              value={applyExcluded}
              onChange={(v) => setApplyExcluded(v)}
              disabled={preset !== "m"}
            />
          </div>
        </Row>
        <Row>
          <span className="flex grow">{t("all types")}</span>
          <Switch value={allTypes} onChange={(v) => setAllTypes(v)} />
        </Row>
        <Row>
          <span className="flex grow">{t("unique chars")}</span>
          <Switch value={uniqueChars} onChange={(v) => setUniqueChars(v)} />
        </Row>
      </main>
      <Footer />
    </div>
  );
}

export default App;
