import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      "offline ready": "You can install this app for offline use.",
      "update app": "A new app is available. Click to refresh.",
      "app title": "Honkipass 5",
      password: "Password",
      generated: "Generated a password",
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
      "light mode": "Light Mode",
      "dark mode": "Dark Mode",
      auto: "Auto",
    },
  },
  ja: {
    translation: {
      "offline ready":
        "このアプリはオフラインで使用するためにインストールできます。",
      "update app":
        "新しいアプリがあります。ボタンをクリックして更新してください。",
      "app title": "本気でパスワード 5",
      password: "パスワード",
      generated: "パスワードを生成しました",
      "please wait": "処理中です...",
      copied: "コピーしました",
      "try again": "設定を変更してやり直してください",
      length: "{{len}}文字",
      std: "標準{{len}}字",
      ext: "拡張{{len}}字",
      manual: "詳細設定",
      "all types": "すべての文字種を使用する",
      "unique chars": "同じ文字を繰り返し使わない",
      "apply excludes": "除外",
      "excluded chars": "除外する文字",
      "light mode": "ライトモード",
      "dark mode": "ダークモード",
      auto: "自動",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
