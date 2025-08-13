import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const translations = {
  en: {
    translation: {
      "offline ready": "App ready to work offline",
      "update app": "New app available, click on reload button to update.",
      "app title": "Honkipass",
      password: "Password",
      generated: "Generated",
      "please wait": "Please wait...",
      copied: "Copied",
      "try again": "Change the settings and try again",
      length: "{{len}} chars",
      std: "Std {{len}}",
      ext: "Ext {{len}}",
      manual: "Manual",
      "all types": "Use all character types",
      "unique chars": "Don't use the same characters",
      "apply excludes": "Excl",
      "excluded chars": "Excluded characters",
    },
  },
  ja: {
    translation: {
      "offline ready": "オフラインで利用可能です",
      "update app":
        "新しいアプリがあります。更新するには再読み込みボタンをクリックしてください。",
      "app title": "本気でパスワード",
      password: "パスワード",
      generated: "生成しました",
      "please wait": "処理中です...",
      copied: "コピーしました",
      "try again": "設定を変更してやり直してください",
      length: "{{len}}文字",
      std: "標準{{len}}字",
      ext: "拡張{{len}}字",
      manual: "詳細設定",
      "all types": "すべての文字種を使用する",
      "unique chars": "同じ文字を使用しない",
      "apply excludes": "除外",
      "excluded chars": "除外対象の文字",
    },
  },
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: "ja",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
