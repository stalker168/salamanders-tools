// Import features
import { initializeShowActorImage } from './features/show-actor-image.js';
import { initializeGoldenDragonArmor } from './features/golden-dragon-armor.js';
import { initializeDieStatusEffect } from './features/die-status.js';
import { initializePlayActorAudio } from './features/play-audio.js';
import { initializeShowSceneView } from './features/show-scene-view.js';
import { initializeLairActions } from './features/lair-actions.js';

// Main module class
class SalamandersPremades {
    static MODULE_ID = 'salamanders-tools';
    
    static initialize() {
        // Register module settings
        this.registerSettings();
        
        // Initialize enabled features
        this.initializeFeatures();
    }
    
    static registerSettings() {
        // Show Actor Image feature
        game.settings.register(this.MODULE_ID, 'enableShowActorImage', {
            name: 'SALAMANDERS.Settings.EnableShowActorImage.Name',
            hint: 'SALAMANDERS.Settings.EnableShowActorImage.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });

        // Golden Dragon Armor feature
        game.settings.register(this.MODULE_ID, 'enableGoldenDragonArmor', {
            name: 'SALAMANDERS.Settings.EnableGoldenDragonArmor.Name',
            hint: 'SALAMANDERS.Settings.EnableGoldenDragonArmor.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });

        // Custom Dead status
        game.settings.register(this.MODULE_ID, 'enableDieStatusEffect', {
            name: 'SALAMANDERS.Settings.EnableDieStatusEffect.Name',
            hint: 'SALAMANDERS.Settings.EnableDieStatusEffect.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });

        // Play Actor Audio feature
        game.settings.register(this.MODULE_ID, 'enablePlayActorAudio', {
            name: 'SALAMANDERS.Settings.EnablePlayActorAudio.Name',
            hint: 'SALAMANDERS.Settings.EnablePlayActorAudio.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });

        // Show Scene View feature
        game.settings.register(this.MODULE_ID, 'enableShowSceneView', {
            name: 'SALAMANDERS.Settings.EnableShowSceneView.Name',
            hint: 'SALAMANDERS.Settings.EnableShowSceneView.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });

        // Lair Actions feature
        game.settings.register(this.MODULE_ID, 'enableLairActions', {
            name: 'SALAMANDERS.Settings.EnableLairActions.Name',
            hint: 'SALAMANDERS.Settings.EnableLairActions.Hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            onChange: () => window.location.reload()
        });
    }
    
    static initializeFeatures() {
        // Initialize Show Actor Image feature if enabled
        if (game.settings.get(this.MODULE_ID, 'enableShowActorImage')) {
            initializeShowActorImage();
        }

        // Initialize Golden Dragon Armor feature if enabled
        if (game.settings.get(this.MODULE_ID, 'enableGoldenDragonArmor')) {
            initializeGoldenDragonArmor();
        }

        // Initialize Custom Dead status feature if enabled
        if (game.settings.get(this.MODULE_ID, 'enableDieStatusEffect')) {
            initializeDieStatusEffect();
        }

        if (game.settings.get(this.MODULE_ID, 'enablePlayActorAudio')) {
            initializePlayActorAudio();
        }

        if (game.settings.get(this.MODULE_ID, 'enableShowSceneView')) {
            initializeShowSceneView();
        }

        if (game.settings.get(this.MODULE_ID, 'enableLairActions')) {
            initializeLairActions();
        }
    }
}

// Initialize the module
Hooks.once('init', () => {
    console.log('Salamanders Premades | Initializing module');
    SalamandersPremades.initialize();
});

Hooks.once('ready', () => {
    console.log('Salamanders Premades | Module is ready');
});
