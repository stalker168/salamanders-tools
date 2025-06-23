export function initializeShowSceneView() {
    Hooks.on('renderJournalTextPageSheet', (sheet, html) => {
        html.find('a.content-link[data-type="Scene"]').contextmenu(async function (event) {
            event.preventDefault();

            const scene = await fromUuid(this.dataset.uuid);
            if (!scene) {
                ui.notifications.warn("Scene not found.");
                return;
            }

            // Activate scene view for all players
            scene.view();
            
            // Optional: Show notification
            ui.notifications.info(`Viewing scene: ${scene.name}`);
        });
    });
}
