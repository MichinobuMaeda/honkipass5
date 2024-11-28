/* global $state, $derived */
const init = () => {
  let msg = { en: {}, ja: {} };

  msg.en.updateApp = () => "Please update this app";
  msg.ja.updateApp = () => "アプリを更新してください";
  msg.en.appTitle = () => "Honkipass";
  msg.ja.appTitle = () => "本気でパスワード";
  msg.en.password = () => "Password";
  msg.ja.password = () => "パスワード";
  msg.en.generated = () => "Generated";
  msg.ja.generated = () => "生成しました";
  msg.en.copied = () => "Copied";
  msg.ja.copied = () => "コピーしました";
  msg.en.try_again = () => "Change the settings and try again";
  msg.ja.try_again = () => "設定を変更してやり直してください";
  msg.en.length = ({ len }) => `Length: ${len}`;
  msg.ja.length = ({ len }) => `${len}文字`;
  msg.en.std = ({ len }) => `Std ${len}`;
  msg.ja.std = ({ len }) => `標準${len}字`;
  msg.en.ext = ({ len }) => `Ext ${len}`;
  msg.ja.ext = ({ len }) => `拡張${len}字`;
  msg.en.manual = () => "Manual";
  msg.ja.manual = () => "詳細設定";
  msg.en.all_types = () => "Use all character types";
  msg.ja.all_types = () => "すべての文字種を使用する";
  msg.en.unique_chars = () => "Don't use the same characters";
  msg.ja.unique_chars = () => "同じ文字を使用しない";
  msg.en.excl = () => "Excl";
  msg.ja.excl = () => "除外";
  msg.en.excluded_chars = () => "Excluded characters";
  msg.ja.excluded_chars = () => "除外対象の文字";

  return msg;
};

const messages = init();

const honkipassLangKey = "honkipass_lang";

let lang = $state(localStorage.getItem(honkipassLangKey) ?? "ja");

let langTargetName = $derived(lang === "en" ? "日本語" : "English");

export const langButtonName = () => langTargetName;

let localizedMessage = $derived(messages[lang]);

export const m = () => localizedMessage;

export const toggleLang = () => {
  lang = lang === "ja" ? "en" : "ja";
  localStorage.setItem(honkipassLangKey, lang);
};
