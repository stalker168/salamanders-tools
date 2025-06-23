export function initializePlayActorAudio() {
    // Handler for all document types where audio links might be present
    const handleAudioLinks = (html) => {
        html.on('contextmenu', 'a.content-link', async function (event) {
            // Check if the link is a playlist sound link
            const dataUuid = this.dataset.uuid;
            if (!dataUuid || !dataUuid.includes('PlaylistSound')) {
                return;
            }
            
            event.preventDefault(); // Prevent default context menu
            event.stopPropagation(); // Stop event propagation
            
            // Get sound object from UUID
            const sound = await fromUuid(dataUuid);
            if (!sound) return;
            
            // Get playlist that owns the sound
            const playlist = sound.parent;
            if (!playlist) return;
            
            // If sound is already playing, stop it
            if (sound.playing) {
                await playlist.stopSound(sound);
                return;
            }
            
            // Stop all playlists
            for (const pl of game.playlists.filter(p => p.playing)) {
                await pl.stopAll();
            }
            
            // Play sound through playlist
            await playlist.playSound(sound);
        });
    };
    
    // Apply handler to all contexts where links might be present
    Hooks.on('renderChatLog', (app, html) => {
        handleAudioLinks(html);
    });
    
    Hooks.on('renderJournalSheet', (sheet, html) => {
        handleAudioLinks(html);
    });
    
    Hooks.on('renderJournalTextPageSheet', (sheet, html) => {
        handleAudioLinks(html);
    });
}