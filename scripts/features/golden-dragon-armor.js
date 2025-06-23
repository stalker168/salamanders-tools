// Constants
const ITEM_NAME = "Живой доспех золотого дракона";
const EXHAUSTION_STATUS = "exhaustion";
const EFFECT_CHANGES = [
    "spell.dc",
    "abilities.check",
    "abilities.save",
    "mwak.attack",
    "rwak.attack",
    "msak.attack",
    "rsak.attack"
];

export function initializeGoldenDragonArmor() {
    Hooks.on("dnd5e.restCompleted", (actor, { longRest }) => {
        if (!longRest || !actor.items.some(i => i.name === ITEM_NAME)) return;

        new Dialog({
            title: game.i18n.localize("SALAMANDERS.GoldenDragonArmor.DialogTitle"),
            content: game.i18n.format("SALAMANDERS.GoldenDragonArmor.DialogContent", { actorName: actor.name }),
            buttons: {
                hitDice: {
                    icon: "<i class='fas fa-heart'></i>",
                    label: game.i18n.localize("SALAMANDERS.GoldenDragonArmor.SpendHitDice"),
                    callback: () => spendHalfHitDice(actor)
                },
                exhaustion: {
                    icon: "<i class='fas fa-tired'></i>",
                    label: game.i18n.localize("SALAMANDERS.GoldenDragonArmor.Exhaustion"),
                    callback: () => handleExhaustion(actor)
                }
            }
        }).render(true);
    });
}

async function spendHalfHitDice(actor) {
    // Get all classes and calculate available hit dice
    const classes = actor.items.filter(i => i.type === "class");
    const availableByClass = classes.map(c => {
        const data = c.system;
        const maxDice = data.hitDiceUsedMax ?? data.levels ?? 0;
        const used = data.hitDiceUsed ?? 0;
        return { 
            class: c, 
            available: Math.max(0, maxDice - used),
            used
        };
    });

    const totalAvailable = availableByClass.reduce((sum, c) => sum + c.available, 0);
    const toSpend = Math.floor(totalAvailable / 2);

    if (toSpend <= 0) {
        ui.notifications.warn(game.i18n.format("SALAMANDERS.GoldenDragonArmor.NoHitDice", { actorName: actor.name }));
        return;
    }

    // Distribute hit dice usage
    let remain = toSpend;
    for (const classData of availableByClass) {
        if (remain <= 0 || classData.available <= 0) continue;
        
        const spendHere = Math.min(classData.available, remain);
        await classData.class.update({
            "system.hitDiceUsed": classData.used + spendHere
        });
        remain -= spendHere;
    }

    ui.notifications.info(game.i18n.format("SALAMANDERS.GoldenDragonArmor.SpentHitDice", {
        actorName: actor.name,
        spent: toSpend,
        total: totalAvailable
    }));
}

async function handleExhaustion(actor) {
    const currentExhaustion = actor.effects.find(e => e.statuses?.has(EXHAUSTION_STATUS));
    
    if (currentExhaustion) {
        ui.notifications.info(game.i18n.format("SALAMANDERS.GoldenDragonArmor.ExhaustionExists", {
            actorName: actor.name
        }));
        return;
    }

    await actor.createEmbeddedDocuments("ActiveEffect", [createExhaustionEffect(1)]);
    ui.notifications.warn(game.i18n.format("SALAMANDERS.GoldenDragonArmor.ExhaustionAdded", {
        actorName: actor.name
    }));
}

function createExhaustionEffect(level) {
    return {
        name: `Exhaustion (${level})`,
        icon: `modules/dfreds-convenient-effects/images/exhaustion${Math.ceil(level / 2)}.svg`,
        description: game.i18n.format("SALAMANDERS.GoldenDragonArmor.ExhaustionDescription", { level }),
        statuses: [EXHAUSTION_STATUS],
        "flags.world.level": level,
        changes: [
            ...EFFECT_CHANGES.map(key => ({
                key: `system.bonuses.${key}`,
                mode: CONST.ACTIVE_EFFECT_MODES.ADD,
                value: "-@flags.world.exhaustionLevel"
            })),
            {
                key: "flags.world.exhaustionLevel",
                mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
                value: level
            }
        ]
    };
}
