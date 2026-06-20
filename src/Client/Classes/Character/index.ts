import Disposable from "Shared/Classes/Disposable";
import CharacterComponent from "./CharacterComponent";
import Log, { Logger } from "@rbxts/log";
import CharacterComponentRegistry from "./CharacterComponentRegistry";
import { CharacterComponentMap } from "./Character";

export default class Character extends Disposable {
	public readonly Model: Model;
	public readonly Humanoid: Humanoid;

	private readonly _logger: Logger = Log.ForContext(Character);
	private readonly _components: Record<string, CharacterComponent> = {};

	public constructor(characterModel: Model) {
		super();

		const humanoid = this._getHumanoid(characterModel);

		this.Model = characterModel;
		this.Humanoid = humanoid;

		this._loadComponents();
	}

	public GetComponent<T extends keyof CharacterComponentMap>(component: T): CharacterComponentMap[T] {
		return this._components[component] as CharacterComponentMap[T];
	}

	private _loadComponents(): void {
		this._logger.Debug("Loading Character components...");

		for (const [name, Component] of CharacterComponentRegistry) {
			this._logger.Debug("Loading {Component} component...", name);

			try {
				this._components[name] = new Component(this);
			} catch (err) {
				this._logger.Error("Error loading {Component} component: {Error}", name, err);
			}
		}

		this._logger.Debug("Finished loading Character components!");
	}

	private _getHumanoid(characterModel: Model): Humanoid {
		const humanoid = characterModel.WaitForChild("Humanoid");
		assert(
			humanoid.IsA("Humanoid"),
			`Tried to get a 'Humanoid' instance from character model, but ${humanoid} is not a Humanoid!`
		);
		assert(humanoid, "Failed to get Humanoid from character model");
		return humanoid;
	}
}
