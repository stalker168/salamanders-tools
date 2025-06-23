export function initializeDieStatusEffect() {
    Hooks.on("updateActor", async (actor, data) => {
        const currentHP = getProperty(data, "system.attributes.hp.value");
        if (currentHP !== undefined) {
            const tokens = actor.getActiveTokens();
            for (const token of tokens) {
                if (currentHP <= 0) {
                    const statusEffect = actor.type === "character" ? "incapacitated" : "dead";
                    await token.toggleEffect(
                        { id: statusEffect },
                        { overlay: true, active: true }
                    );
                } else {
                    // Убираем оба эффекта при восстановлении HP
                    await token.toggleEffect(
                        { id: "dead" },
                        { overlay: true, active: false }
                    );
                    await token.toggleEffect(
                        { id: "incapacitated" },
                        { overlay: true, active: false }
                    );
                }
            }
        }
    });
}