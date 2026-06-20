import Signal from "@rbxts/signal";
import CharacterComponent from "./CharacterComponent";
import type StaminaComponent from "./StaminaComponent";
import type Character from ".";

export default class StaminaRegeneratorComponent extends CharacterComponent {
	public readonly RegenerationStarted: Signal = this.Trove.add(new Signal());
	public readonly RegenerationStopped: Signal = this.Trove.add(new Signal());

	public RegenerationSpeed: number = 0.01;
	public RegenerationStrength: number = 0.1;
	public RegenerationDelay: number = 1;

	private readonly _stamina: StaminaComponent;

	private _isRegenerating: boolean = false;

	private _delayTask?: thread;

	public constructor(character: Character) {
		super(character);

		const stamina = character.GetComponent("StaminaComponent");

		this._stamina = stamina;

		this.Trove.connect(stamina.StaminaSubtracted, () => this._handleStaminaSubtracted());
	}

	public StartRegeneration(): void {
		if (this._isRegenerating) return;
		if (!this._canRegenerate()) return;

		this._isRegenerating = true;
		this.RegenerationStarted.Fire();

		task.spawn(() => {
			while (this._isRegenerating && this._canRegenerate()) {
				this._stamina.AddStamina(this.RegenerationStrength);
				task.wait(this.RegenerationSpeed);
			}

			this.StopRegeneration();
		});
	}

	public StopRegeneration(): void {
		if (!this._isRegenerating) return;

		this._isRegenerating = false;
		this.RegenerationStopped.Fire();
	}

	public IsRegenerating(): boolean {
		return this._isRegenerating;
	}

	private _canRegenerate(): boolean {
		return this.Character.Humanoid.Health > 0 && this._stamina.GetStamina() < this._stamina.GetMaxStamina();
	}

	private _handleStaminaSubtracted(): void {
		if (this._isRegenerating) this.StopRegeneration();
		if (this._delayTask) task.cancel(this._delayTask);
		this._delayTask = task.delay(this.RegenerationDelay, () => this.StartRegeneration());
	}
}
