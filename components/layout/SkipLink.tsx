// Premier élément atteignable au clavier : permet de passer directement au contenu.
export default function SkipLink() {
  return (
    <a
      href="#contenu"
      className="focus:bg-blue-button sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
    >
      Aller au contenu
    </a>
  );
}
