import Log, { Logger } from "@rbxts/log";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";
import Character from "Client/Classes/Character";

debug.setmemorycategory("FRAMEWORK/CharacterController");

class CharacterController {
	public readonly CharacterCreated: Signal<(character: Character) => void> = new Signal();
	public readonly CharacterDestroying: Signal<(character: Character) => void> = new Signal();

	private readonly _logger: Logger = Log.ForContext(CharacterController);

	private _character?: Character;

	public constructor() {
		Players.LocalPlayer.CharacterAdded.Connect((character) => this._handleCharacterAdded(character));
		Players.LocalPlayer.CharacterRemoving.Connect(() => this._handleCharacterRemoving());
	}

	public GetCharacter(): Character | undefined {
		return this._character;
	}

	private _handleCharacterAdded(character: Model): void {
		try {
			if (this._character)
				return this._logger.Warn("Tried to create a Character instance, but it already exists!");

			this._character = new Character(character);

			this.CharacterCreated.Fire(this._character);

			this._logger.Debug("Created a Character instance");
		} catch (err) {
			this._logger.Error("Error creating a Character instance: {Error}", err);
		}
	}

	private _handleCharacterRemoving(): void {
		try {
			if (!this._character)
				return this._logger.Warn("Tried to destroy a Character instance, but it does not exist!");

			this.CharacterDestroying.Fire(this._character);

			this._character.Destroy();
			this._character = undefined;
		} catch (err) {
			this._logger.Error("Error destroying a Character instance: {Error}", err);
		}
	}
}

const characterController = new CharacterController();
type characterController = CharacterController;
export { characterController as CharacterController };
