function Footer() {
  return (
    <div
      className={`flex flex-row justify-center-safe fixed bottom-0
        items-start sm:items-end px-2 pt-2 pb-4 gap-2
        bg-light-background dark:bg-dark-background
        text-light-on-background dark:text-dark-on-background`}
    >
      © 2024-2005 Michinobu Maeda
      <a
        className={`mx-2 underline underline-offset-2
          text-light-link dark:text-dark-link`}
        href="https://github.com/MichinobuMaeda/honkipass5"
      >
        GitHub
      </a>
    </div>
  );
}

export default Footer;
