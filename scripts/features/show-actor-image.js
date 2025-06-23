export function initializeShowActorImage() {
    Hooks.on('renderJournalTextPageSheet', (sheet, html) => {
        html.find('a.content-link[data-type="Actor"]').contextmenu(async function (event) {
            event.preventDefault(); // Prevent the default context menu

            const actor = await fromUuid(this.dataset.uuid);
            if (!actor) {
                ui.notifications.warn("Actor not found.");
                return;
            }

            // Open and share the ImagePopout
            const popout = new ImagePopout(actor.img, {
                title: actor.name,
                uuid: actor.uuid,
                showTitle: true
            }).render(true);
            popout.shareImage();
        });
    });
}
