Hooks.once("ready", async () => {
  if (!game.user.isGM) return;

  const name = "Export Active Modules";
  const command = `
const activeModules = Array.from(game.modules.values())
  .filter(m => m.active)
  .map(m => \`\${m.title} (\${m.version ?? "no version"})\`)
  .sort();

const content = activeModules.join("\\n");
saveDataToFile(content, "text/plain", "active-modules.txt");
`;

  let macro = game.macros.find(m => m.name === name && m.type === "script");
  if (!macro) {
    macro = await Macro.create({
      name,
      type: "script",
      scope: "global",
      command,
      img: "icons/svg/export.svg"
    });
    ui.notifications?.info("Macro 'Export Active Modules' created");
  }
});
