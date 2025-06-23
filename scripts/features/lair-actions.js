export function initializeLairActions() {
    Hooks.on("createCombatant", async (combatant, options, userId) => {
        if (!game.user.isGM || !combatant.token?.actor) return;
        if (options._isLairAction) return;
        
        const actor = combatant.token.actor;
        if (actor.type !== "npc") return;
        
        const lairInitiative = actor.system?.resources?.lair?.initiative;
        if (typeof lairInitiative !== 'number' || isNaN(lairInitiative)) return;
        
        const combat = combatant.parent;
        const token = combatant.token;
        
        await combat.createEmbeddedDocuments("Combatant", [{
            tokenId: token.id,
            sceneId: token.parent.id,
            actorId: token.actorId,
            hidden: token.hidden,
            initiative: lairInitiative,
            name: game.i18n.format("SALAMANDERS.LairActions.CombatantName", {
                creatureName: token.name
            }),
            img: "systems/my-system/icons/lair-action.png"
        }], { _isLairAction: true });
    });
}