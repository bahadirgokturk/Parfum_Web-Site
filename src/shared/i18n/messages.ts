import type { Locale } from "./config";

const messages = {
  tr: {
    nav: { collection: "Koleksiyon", story: "Hikâyemiz", adviser: "Koku Danışmanı" },
    hero: {
      kicker: "Paris'ten bir iz",
      title: "Kokun, seni anlatmadan önce anlatır.",
      body: "Teninde kalan, hafızada yaşayan ve yalnızca sana ait hissettiren bir imza.",
      primary: "Kokunu keşfet",
      secondary: "Koleksiyonu gör",
    },
    film: {
      kicker: "Bir koku, üç an",
      title: "Işığın değiştiği yerde hikâye başlar.",
      body: "Bordo geceden pudra pembesi sabaha uzanan Flawless Paris dünyasını keşfet.",
      scenes: ["Gece", "Dokunuş", "Işık"],
    },
    collection: {
      kicker: "İlk seçki",
      title: "Ritüeline eşlik eden parçalar",
      note: "Ürün adları ve içerikler marka onayı bekleyen prototip bilgileridir.",
      add: "Demo sepete ekle",
      details: "Detayları gör",
      pricePending: "Fiyat marka onayı bekliyor",
      prototype: "Prototip ürün",
      allProducts: "Tüm koleksiyonu gör",
    },
    adviser: {
      kicker: "Flawless danışman",
      title: "Nasıl hissettirmesini istersin?",
      body: "Bir kişiyi, anı ya da havayı tarif et. Danışmanımız doğrulanmış bilgiler sınırında sana bir başlangıç seçsin.",
      placeholder: "Örn. Eşime zarif bir hediye arıyorum…",
      ask: "Önerimi hazırla",
      quick: ["Zarif bir hediye", "Günlük bir ritüel", "Gösterişli bir sunum"],
      empty: "Bana biraz ipucu verir misin? Kimin için ve nasıl bir his aradığını yazabilirsin.",
      resultLead: "Sana başlangıç olarak şunu öneriyorum:",
      disclaimer: "Koku notaları henüz marka tarafından doğrulanmadığı için öneri sunum ve kullanım biçimine göre yapılmıştır.",
    },
    cart: { title: "Demo çantan", empty: "Seçtiğin parçalar burada görünecek.", close: "Kapat", remove: "Çıkar", demo: "Bu bir prototiptir; ödeme alınmaz." },
    footer: { line: "Kusursuz değil. Sana özgü.", rights: "Prototip sunum — ticari satış yapılmaz." },
  },
  en: {
    nav: { collection: "Collection", story: "Our story", adviser: "Scent adviser" },
    hero: { kicker: "A trace from Paris", title: "Your scent speaks before you do.", body: "A signature that lingers on skin, lives in memory and feels entirely your own.", primary: "Find your scent", secondary: "View collection" },
    film: { kicker: "One scent, three moments", title: "The story begins where the light shifts.", body: "Enter the Flawless Paris world, from burgundy night to powder-pink morning.", scenes: ["Night", "Touch", "Light"] },
    collection: { kicker: "The first edit", title: "Pieces for your daily ritual", note: "Product names and details are prototype content awaiting brand approval.", add: "Add to demo bag", details: "View details", pricePending: "Price awaiting brand approval", prototype: "Prototype product", allProducts: "View the full collection" },
    adviser: { kicker: "Flawless adviser", title: "How should it make you feel?", body: "Describe a person, moment or mood. Our adviser will choose a starting point within verified information.", placeholder: "E.g. I am looking for an elegant gift…", ask: "Prepare my edit", quick: ["An elegant gift", "A daily ritual", "A striking presentation"], empty: "Give me a little clue: who is it for and what feeling are you after?", resultLead: "My starting recommendation for you:", disclaimer: "As scent notes have not yet been verified by the brand, this recommendation is based on presentation and use." },
    cart: { title: "Your demo bag", empty: "Your selected pieces will appear here.", close: "Close", remove: "Remove", demo: "This is a prototype; no payment is collected." },
    footer: { line: "Not flawless. Uniquely yours.", rights: "Presentation prototype — no commercial sales." },
  },
  fr: {
    nav: { collection: "Collection", story: "Notre histoire", adviser: "Conseiller parfum" },
    hero: { kicker: "Une trace de Paris", title: "Votre parfum parle avant vous.", body: "Une signature qui reste sur la peau, vit dans la mémoire et n'appartient qu'à vous.", primary: "Trouver mon parfum", secondary: "Voir la collection" },
    film: { kicker: "Un parfum, trois instants", title: "L'histoire commence quand la lumière change.", body: "Découvrez l'univers Flawless Paris, de la nuit bordeaux au matin rose poudré.", scenes: ["Nuit", "Toucher", "Lumière"] },
    collection: { kicker: "Première sélection", title: "Des pièces pour votre rituel", note: "Les noms et détails des produits sont provisoires, en attente de validation.", add: "Ajouter au sac démo", details: "Voir les détails", pricePending: "Prix en attente de validation", prototype: "Produit prototype", allProducts: "Voir toute la collection" },
    adviser: { kicker: "Conseiller Flawless", title: "Quelle émotion recherchez-vous ?", body: "Décrivez une personne, un moment ou une ambiance. Notre conseiller choisira un point de départ avec les informations vérifiées.", placeholder: "Ex. Je cherche un cadeau élégant…", ask: "Préparer ma sélection", quick: ["Un cadeau élégant", "Un rituel quotidien", "Une présentation remarquable"], empty: "Donnez-moi un indice : pour qui et quelle émotion recherchez-vous ?", resultLead: "Mon point de départ pour vous :", disclaimer: "Les notes olfactives n'étant pas encore validées, cette suggestion repose sur la présentation et l'usage." },
    cart: { title: "Votre sac démo", empty: "Vos pièces sélectionnées apparaîtront ici.", close: "Fermer", remove: "Retirer", demo: "Ceci est un prototype ; aucun paiement n'est effectué." },
    footer: { line: "Pas parfaite. Uniquement vôtre.", rights: "Prototype de présentation — aucune vente commerciale." },
  },
} as const;

export function getMessages(locale: Locale) { return messages[locale]; }
export type Messages = ReturnType<typeof getMessages>;
