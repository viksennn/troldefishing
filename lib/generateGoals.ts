type Goal = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: string;
  tierLabel: string;
  tierColor: string;
};

export function generateGoals(fangster: any[]): Goal[] {
  const tierMeta: Record<string, { label: string; color: string }> = {
    basic: { label: "Begynder", color: "#C0C0C0" },
    ama: { label: "Amatør", color: "#A9A9A9" },
    semi: { label: "Semi-Pro", color: "#66B2FF" },
    pro: { label: "Pro", color: "#3366FF" },
    master: { label: "Master", color: "#9966FF" },
    king: { label: "Konge", color: "#FF9900" },
    legend: { label: "Legende", color: "#FF6666" },
    saint: { label: "Hellig", color: "#00CC99" },
    god: { label: "Gud", color: "#FFD700" },
  };

  const tierOrder = [
    "god", "saint", "legend", "king",
    "master", "pro", "semi", "ama", "basic"
  ];

  const goals: Goal[] = [];
  const count = (art: string) => fangster.filter(f => f.art === art).length;
  const uniqueArts = new Set(fangster.map(f => f.art));
  const has = (art: string) => fangster.some(f => f.art === art);
  const countUnique = () => [...uniqueArts].length;

  const addGoal = (
    id: string,
    title: string,
    description: string,
    icon: string,
    tier: string
  ) => {
    const meta = tierMeta[tier] || { label: "Ukendt", color: "#ccc" };
    goals.push({ id, title, description, icon, tier, tierLabel: meta.label, tierColor: meta.color });
  };

  // Første fangst
  if (fangster.length > 0) {
    addGoal("first_catch", "Officiel Fisker", "Fang din første fisk", "fishing-rod.png", "basic");
  }

  // Eksotisk
  const ekskluderedeArter = ["Regnbue Ørred", "Bækørred", "Gedde", "Aborre", "Skalle", "Hornfisk", "Makrel", "Rødspætte", "Skrubbe", "Stør"];
  const hasEksotisk = fangster.some(f => !ekskluderedeArter.includes(f.art));
  if (hasEksotisk) {
    addGoal("eksotisk", "Eksotisk Fisker", "Fang en eksotisk fisk", "eksotisk.png", "basic");
  }

  // Vild sø
  if (has("Gedde") && has("Skalle") && has("Aborre")) {
    addGoal("vildsoe", "Vild Sø", "Fang Gedde, Skalle og Aborre", "vildsoe.png", "master");
  }

  // Tiers pr. art
  const arter: { art: string; prefix: string; iconPrefix: string }[] = [
    { art: "Regnbue Ørred", prefix: "rbørred", iconPrefix: "rbørred" },
    { art: "Aborre", prefix: "aborre", iconPrefix: "aborre" },
    { art: "Gedde", prefix: "pike", iconPrefix: "pike" },
    { art: "Skalle", prefix: "skalle", iconPrefix: "skalle" }
  ];

  const tiers = [
    { amount: 75, tier: "god" },
    { amount: 50, tier: "saint" },
    { amount: 40, tier: "legend" },
    { amount: 30, tier: "king" },
    { amount: 20, tier: "master" },
    { amount: 10, tier: "pro" },
    { amount: 5, tier: "semi" },
    { amount: 2, tier: "ama" },
    { amount: 1, tier: "basic" }
  ];

  for (const { art, prefix, iconPrefix } of arter) {
    const artCount = count(art);
    for (const t of tiers) {
      if (artCount >= t.amount) {
        addGoal(
          `${prefix}_${t.amount}`,
          `${art}`,
          `Fang ${t.amount === 1 ? 'din første' : t.amount} ${art}${t.amount > 1 ? 'er' : ''}`,
          `${iconPrefix}_${t.tier}.png`,
          t.tier
        );
        break;
      }
    }
  }

  // Art Hunter
  if (countUnique() >= 10) {
    addGoal("art_hunter", "Art Hunter", "Fang 10 forskellige arter", "arthunter.png", "master");
  }

  // Enkeltstående arter
  const andreEnkeltstående = [
    { art: "Stør", id: "stor", title: "Stør-fisker", icon: "stør.png" },
    { art: "Hornfisk", id: "hornfisk", title: "Hornfisker", icon: "hornfisk.png" },
    { art: "Makrel", id: "makrel", title: "Makrelmester", icon: "makrel.png" },
    { art: "Guld Ørred", id: "guld", title: "Guld Ørred", icon: "golden-trout.png" },
    { art: "Bækørred", id: "baekorred", title: "Bækørred", icon: "browntrout.png" },
    { art: "Rødspætte", id: "rødspaette", title: "Fladfisker", icon: "fladfisk.png" },
    { art: "Skrubbe", id: "skrubbe", title: "Fladfisker", icon: "fladfisk.png" }
  ];

  for (const ach of andreEnkeltstående) {
    if (has(ach.art)) {
      addGoal(ach.id, ach.title, `Fanget sin første ${ach.art}`, ach.icon, "basic");
    }
  }
  
  goals.sort((a, b) => {
    return tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier);
  });

  return goals;
}
