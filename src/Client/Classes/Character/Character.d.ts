import CharacterComponentRegistry from "./CharacterComponentRegistry";

type CharacterComponentMap = { [K in (typeof CharacterComponentRegistry)[number] as K[0]]: InstanceType<K[1]> };
