import Log, { Logger } from "@rbxts/log";
import CharacterComponent from "./CharacterComponent";
import Signal from "@rbxts/signal";

export default class StaminaComponent extends CharacterComponent {
	public readonly StaminaChanged: Signal<(oldStamina: number, newStamina: number) => void> = this.Trove.add(
		new Signal()
	);
	public readonly StaminaAdded: Signal<(oldStamina: number, newStamina: number) => void> = this.Trove.add(
		new Signal()
	);
	public readonly StaminaSubtracted: Signal<(oldStamina: number, newStamina: number) => void> = this.Trove.add(
		new Signal()
	);

	private readonly _logger: Logger = Log.ForContext(StaminaComponent);

	private _currentStamina: number = 100;
	private _maxStamina: number = 100;

	public GetStamina(): number {
		return this._currentStamina;
	}

	public GetMaxStamina(): number {
		return this._maxStamina;
	}

	public SetStamina(value: number): void {
		if (value < 0) return this._logger.Warn("Parameter 'Value' cannot be less than 0");

		const oldStamina = this._currentStamina;
		this._currentStamina = math.clamp(value, 0, this._maxStamina);
		this.StaminaChanged.Fire(oldStamina, this._currentStamina);
	}

	public SetMaxStamina(value: number): void {
		if (value < 0) return this._logger.Warn("Parameter 'Value' cannot be less than 0");

		this._maxStamina = value;
		if (this._currentStamina > this._maxStamina) this.SetStamina(value);
	}

	public AddStamina(amount: number): void {
		const oldStamina = this._currentStamina;
		this.SetStamina(this._currentStamina + amount);
		this.StaminaAdded.Fire(oldStamina, this._currentStamina);
	}

	public SubtractStamina(amount: number): void {
		const oldStamina = this._currentStamina;
		this.SetStamina(this._currentStamina - amount);
		this.StaminaSubtracted.Fire(oldStamina, this._currentStamina);
	}
}
